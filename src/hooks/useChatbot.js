import { useState, useCallback } from 'react';

export const useChatbot = ({
  webhookUrl,
  webhookApiKey = null,
  webhookHeaders = {},
  onResponse,
  onError,
  formatRequest,
  parseResponse,
  availableActions = [],
  onActionTriggered
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

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
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
      const friendlyMessage = "O sistema está em desenvolvimento. Aguarde, lançamento em breve!";
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: friendlyMessage,
        timestamp: (new Date()).toISOString(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(err.message);
      if (onError) {
        onError(err, friendlyMessage);
      }
      setIsLoading(false);
      return errorMessage;
    }
  }, [webhookUrl, webhookApiKey, webhookHeaders, formatRequest, parseResponse, onResponse, onError, availableActions, onActionTriggered]);

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
