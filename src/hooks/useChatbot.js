import { useState, useCallback } from 'react';

// Friendly, localized fallback copy shown to the user when the webhook fails.
// `translate` is the AvatarChatbot's i18n resolver (tr.t); when absent (the hook
// used standalone) we degrade to the pt-BR base wording so behavior is unchanged
// for callers that don't pass a translator.
const DEFAULT_GENERIC_ERROR = 'Tive um probleminha aqui, pode tentar de novo?';

function resolveGenericError(translate) {
  if (typeof translate === 'function') {
    const out = translate('chat.error.generic');
    // createTranslator returns the key itself on a miss → use our default copy
    if (out && out !== 'chat.error.generic') return out;
  }
  return DEFAULT_GENERIC_ERROR;
}

// A 5xx (server) or a network/CORS failure (fetch rejects → no response object)
// is transient and worth a single silent retry — it masks backend cold-starts.
// A 4xx is the caller's fault and is NOT retried.
function isRetriable(status) {
  return status == null || status >= 500;
}

const RETRY_DELAY_MS = 1200;

export const useChatbot = ({
  webhookUrl,
  webhookApiKey = null,
  webhookHeaders = {},
  // Client-side responder override. When set, replaces the webhook POST: called
  // with (message, metadata), returns the reply as a string OR an object
  // { message|content|text, attachments?, action? }. Enables a fake/mock
  // provider or a custom AI client with no webhookUrl. A throw is surfaced as
  // the same friendly error the webhook path uses.
  onSendMessage,
  onResponse,
  onError,
  formatRequest,
  parseResponse,
  availableActions = [],
  onActionTriggered,
  // Optional i18n resolver (AvatarChatbot passes tr.t). Used only to localize
  // the user-facing fallback message; the hook works without it.
  translate
} = {}) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message, metadata = {}) => {
    const { attachments = [], ...restMetadata } = metadata;

    // Render the user's message immediately (optimistic), BEFORE any guard,
    // so typing + Enter always shows the bubble even if the webhook is
    // missing/misconfigured — otherwise the send silently no-ops and the user
    // thinks nothing was typed.
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message,
      timestamp: (new Date()).toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined,
      ...restMetadata
    };
    setMessages((prev) => [...prev, userMessage]);

    // Client-side responder path — bypasses the webhook entirely. Whatever the
    // handler resolves to becomes the assistant bubble; a throw falls through to
    // the shared friendly-error handling below.
    if (typeof onSendMessage === 'function') {
      setIsLoading(true);
      setError(null);
      try {
        const reply = await onSendMessage(message, metadata);
        let responseText = '';
        let responseAttachments = [];
        let responseAction = null;
        if (typeof reply === 'string') {
          responseText = reply;
        } else if (reply && typeof reply === 'object') {
          responseText = reply.message || reply.content || reply.text || '';
          responseAttachments = reply.attachments || [];
          responseAction = reply.action || null;
        }
        if (responseAction && onActionTriggered) onActionTriggered(responseAction);
        const botMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: responseText,
          timestamp: (new Date()).toISOString(),
          attachments: responseAttachments.length > 0 ? responseAttachments : undefined,
          raw: reply
        };
        setMessages((prev) => [...prev, botMessage]);
        if (onResponse) onResponse(botMessage, reply);
        setIsLoading(false);
        return botMessage;
      } catch (err) {
        console.error('[useChatbot] onSendMessage responder failed:', err);
        const friendlyMessage = resolveGenericError(translate);
        const errorMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: friendlyMessage,
          timestamp: (new Date()).toISOString(),
          isError: true
        };
        setMessages((prev) => [...prev, errorMessage]);
        setError(friendlyMessage);
        if (onError) onError(err, friendlyMessage);
        setIsLoading(false);
        return errorMessage;
      }
    }

    if (!webhookUrl) {
      setError("Chat não configurado (webhookUrl ausente).");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const actionsList = availableActions.length > 0
        ? availableActions.map(a => ({ id: a.id, name: a.name }))
        : undefined;

      const requestBody = formatRequest
        ? formatRequest(message, { ...metadata, availableActions: actionsList })
        : {
            message,
            attachments: attachments.length > 0 ? attachments : undefined,
            availableActions: actionsList,
            ...restMetadata
          };

      const headers = {
        "Content-Type": "application/json",
        ...webhookHeaders
      };

      if (webhookApiKey) {
        headers["Authorization"] = `Bearer ${webhookApiKey}`;
        headers["X-API-Key"] = webhookApiKey;
      }

      const body = JSON.stringify(requestBody);

      // Single POST attempt. Throws an Error carrying `.status` (the HTTP code,
      // or null for a network/CORS failure where no response is produced) so
      // the caller can decide whether the failure is retriable.
      const attempt = async () => {
        let response;
        try {
          response = await fetch(webhookUrl, { method: "POST", headers, body });
        } catch (netErr) {
          // fetch rejects on network/CORS failure — no HTTP status available.
          const e = new Error(netErr && netErr.message ? netErr.message : "network error");
          e.status = null;
          e.cause = netErr;
          throw e;
        }
        if (!response.ok) {
          const e = new Error(`HTTP ${response.status}: ${response.statusText}`);
          e.status = response.status;
          throw e;
        }
        return response;
      };

      let response;
      try {
        response = await attempt();
      } catch (firstErr) {
        // ONE auto-retry on a transient (5xx / network) failure. This masks
        // backend cold-starts that lost first-leads in the canary. A 4xx is the
        // request's fault and is surfaced immediately.
        if (!isRetriable(firstErr.status)) throw firstErr;
        console.error('[useChatbot] webhook failed, retrying once in ' + RETRY_DELAY_MS + 'ms:', firstErr);
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        response = await attempt();
      }

      const data = await response.json();

      let responseText = "";
      let responseAttachments = [];
      let responseAction = null;

      if (parseResponse) {
        const parsed = parseResponse(data);
        if (typeof parsed === 'object' && parsed !== null) {
          responseText = parsed.message || parsed.content || parsed.text || JSON.stringify(parsed);
          responseAttachments = parsed.attachments || [];
          responseAction = parsed.action || null;
        } else {
          responseText = parsed;
        }
      } else {
        responseText = data.message || data.response || data.text || data.content || JSON.stringify(data);
        responseAttachments = data.attachments || data.files || [];
        responseAction = data.action || null;
      }

      if (responseAction && onActionTriggered) {
        onActionTriggered(responseAction);
      }

      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: responseText,
        timestamp: (new Date()).toISOString(),
        attachments: responseAttachments.length > 0 ? responseAttachments : undefined,
        raw: data
      };

      setMessages((prev) => [...prev, botMessage]);

      if (onResponse) {
        onResponse(botMessage, data);
      }

      setIsLoading(false);
      return botMessage;
    } catch (err) {
      // Keep the raw cause (HTTP code / network message) for devs ONLY — it must
      // never reach the user-facing bubble or the `error` state.
      console.error('[useChatbot] webhook error (shown to user as friendly copy):', err);
      const friendlyMessage = resolveGenericError(translate);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: friendlyMessage,
        timestamp: (new Date()).toISOString(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
      // Surface the SAME friendly copy in the error chip — never a raw `HTTP <code>`.
      setError(friendlyMessage);
      if (onError) {
        onError(err, friendlyMessage);
      }
      setIsLoading(false);
      return errorMessage;
    }
  }, [webhookUrl, webhookApiKey, webhookHeaders, onSendMessage, formatRequest, parseResponse, onResponse, onError, availableActions, onActionTriggered, translate]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearMessages
  };
};
