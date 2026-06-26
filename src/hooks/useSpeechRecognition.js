import { useRef, useState, useEffect, useCallback } from 'react';

export const useSpeechRecognition = ({
  sttProvider = "browser",
  sttLang = "pt-BR",
  sttContinuous = false,
  sttInterimResults = true,
  sttApiKey = null,
  sttApiUrl = null,
  onTranscriptChange,
  onFinalTranscript,
  onEnd,
  onError
} = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const isListeningRef = useRef(false);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  const startBrowserRecognition = useCallback(() => {
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      if (onError) onError(new Error("Web Speech API not supported"));
      return false;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = sttLang;
    recognition.continuous = sttContinuous;
    recognition.interimResults = sttInterimResults;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimText = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcriptPiece + " ";
        } else {
          interimText += transcriptPiece;
        }
      }

      if (interimText) {
        setInterimTranscript(interimText);
        if (onTranscriptChange) onTranscriptChange(interimText, false);
      }

      if (finalText) {
        setTranscript((prev) => prev + finalText);
        setInterimTranscript("");
        if (onFinalTranscript) onFinalTranscript(finalText.trim());
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') {
        if (onEnd && isListeningRef.current) onEnd();
        return;
      }
      setIsListening(false);
      if (onError) onError(new Error(event.error));
    };

    recognition.onend = () => {
      setInterimTranscript("");
      if (onEnd && isListeningRef.current) {
        onEnd();
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    return true;
  }, [sttLang, sttContinuous, sttInterimResults, onTranscriptChange, onFinalTranscript, onEnd, onError]);

  const startGoogleRecognition = useCallback(async () => {
    if (!sttApiKey) {
      if (onError) onError(new Error("API Key required for Google STT"));
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(',')[1];

          const apiUrl = sttApiUrl || `https://speech.googleapis.com/v1/speech:recognize?key=${sttApiKey}`;

          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                config: {
                  encoding: 'WEBM_OPUS',
                  sampleRateHertz: 48000,
                  languageCode: sttLang,
                  enableAutomaticPunctuation: true,
                },
                audio: {
                  content: base64Audio,
                },
              }),
            });

            if (!response.ok) {
              throw new Error(`Google STT error: ${response.status}`);
            }

            const data = await response.json();

            if (data.results && data.results[0]) {
              const transcriptText = data.results[0].alternatives[0].transcript;
              setTranscript(transcriptText);
              if (onFinalTranscript) onFinalTranscript(transcriptText);
            }

            if (onEnd) onEnd();
          } catch (err) {
            if (onError) onError(err);
          }
        };

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsListening(true);
      return true;

    } catch (err) {
      if (onError) onError(err);
      return false;
    }
  }, [sttApiKey, sttApiUrl, sttLang, onFinalTranscript, onEnd, onError]);

  const startListening = useCallback(async () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }

    setTranscript("");
    setInterimTranscript("");

    if (sttProvider === "google" && sttApiKey) {
      return await startGoogleRecognition();
    } else {
      return startBrowserRecognition();
    }
  }, [sttProvider, sttApiKey, startGoogleRecognition, startBrowserRecognition]);

  const stopListening = useCallback(() => {
    setIsListening(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
      mediaRecorderRef.current = null;
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (mediaRecorderRef.current) {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    clearTranscript,
  };
};
