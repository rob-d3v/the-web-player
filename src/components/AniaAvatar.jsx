import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useState, useEffect, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { THEMES } from '../constants/themes.js';
import { createTranslator } from '../i18n/index.js';
import { decryptAniaFile, isPlainMarketAnia } from '../utils/crypto.js';
import { calculateOptimalSpeeds } from '../utils/speed-calculator.js';
import { getCachedAvatar, setCachedAvatar } from '../utils/avatar-cache.js';
import { fetchLipSyncConfig, buildOpennessMap } from '../services/lip-sync-api.js';

// forwardRef: useAniaAvatarRef expects `ref.current.playerRef` — without the
// wrapper, React strips `ref` from function components and the hook's
// setTalking/triggerAction/cancelAction silently no-op on the plain player.
export const AniaAvatar = forwardRef(({
  avatarUrl,
  avatarPassword,
  avatarData: externalAvatarData,
  authToken,
  position = "bottom-left",
  width = 300,
  height = 300,
  transparent = false,
  theme = "dark",
  // i18n: locale for built-in UI strings (loading text, control titles, errors).
  // Defaults to 'pt-BR' to preserve original wording; falls back to en for any
  // unknown code. `messagesOverride` lets a consumer override individual keys.
  locale = "pt-BR",
  messagesOverride = null,
  minimizable = true,
  closable = true,
  detectAudio = false,
  // undefined = host did not set it → the file's authored speed (or the fps
  // heuristic) wins. A number = explicit host override that beats both.
  idleSpeed = undefined,
  talkSpeed = undefined,
  autoCalculateSpeed = true,
  startMinimized = false,
  preserveQuality = true,
  /** Força o avatar sempre acima de todos os outros elementos (default: true) */
  alwaysOnTop = true,
  /**
   * Renderiza embutido no fluxo do componente pai (position: relative, sem
   * portal para o body) em vez do widget flutuante fixo. Útil para páginas de
   * teste/galeria que mostram o avatar dentro de um painel próprio.
   */
  inline = false,
  // Mobile-friendly props
  mobileMinimizedSize = 60,
  draggable = true,
  mobileBreakpoint = 768,
  // Lip sync props
  lipSyncEnabled = false,
  lipSyncServerUrl = null,
  lipSyncIntensity = 0.6,
  lipSyncResponsiveness = 0.5,
  // A3 sustain (desktop parity): how the mouth behaves during stable speech.
  // 'hold' freezes the anchor frame; 'wiggle' oscillates around it. When null,
  // the value from server config (if any) is used, else 'wiggle'.
  lipSyncSustainStyle = null,
  // Wiggle amplitude (1..6). null => server config value, else 5.
  lipSyncWiggleSpeed = null,
  // Action frame props
  actions = null,
  enableActionHotkeys = true,
  onActionStart,
  onActionEnd,
  // Initial action props
  initialAction = null,
  initialActionLoop = false,
  // Lip sync audio hookup
  lipSyncAudioRef = null,
  lipSyncHook = null,
  onLoad,
  onTalkStart,
  onTalkEnd,
  onClose,
  onToggleMinimize,
  children
}, ref) => {
  // i18n translator (memoised on locale + override).
  const tr = useMemo(
    () => createTranslator(locale, messagesOverride || undefined),
    [locale, messagesOverride]
  );

  const containerRef = useRef(null);
  const playerRef = useRef(null);
  // Contract used by useAniaAvatarRef: ref.current.playerRef.current = player.
  useImperativeHandle(ref, () => ({ playerRef }), []);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isLoadingRef = useRef(false);
  const canvasObserverRef = useRef(null);
  const styleTagRef = useRef(null);
  const enforcingRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(startMinimized);
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState(null);
  const [isTalking, setIsTalking] = useState(false);

  // Mobile and drag states
  const [isMobile, setIsMobile] = useState(false);
  const [dragPosition, setDragPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStartRef = useRef({ x: 0, y: 0 });
  const outerContainerRef = useRef(null);
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    setIsMinimized(startMinimized);
  }, [startMinimized]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  // Inject pulse keyframe for loading animation (must exist before avatar loads)
  useEffect(() => {
    const id = 'ania-pulse-keyframes';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = '@keyframes ania-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }';
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (!isMinimized) {
      setDragPosition(null);
    }
  }, [isMinimized]);

  const handleDragStart = (e) => {
    if (!draggable || !isMinimized) return;

    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;

    const touch = e.touches?.[0] || e;
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };

    if (outerContainerRef.current) {
      const rect = outerContainerRef.current.getBoundingClientRect();
      positionStartRef.current = { x: rect.left, y: rect.top };
    }
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;

    e.preventDefault();
    const touch = e.touches?.[0] || e;
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasDraggedRef.current = true;
    }

    let newX = positionStartRef.current.x + deltaX;
    let newY = positionStartRef.current.y + deltaY;

    const size = isMobile ? mobileMinimizedSize : Math.floor(width / 2);
    newX = Math.max(0, Math.min(window.innerWidth - size, newX));
    newY = Math.max(0, Math.min(window.innerHeight - size, newY));

    setDragPosition({ x: newX, y: newY });
  };

  const handleDragEnd = (e) => {
    if (isDraggingRef.current) {
      e?.preventDefault();
      e?.stopPropagation();

      // If no actual drag movement occurred, treat as a tap/click to toggle minimize
      if (!hasDraggedRef.current && minimizable) {
        hasDraggedRef.current = true; // Prevent the subsequent click event from double-toggling
        toggleMinimize();
      }
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  useEffect(() => {
    if (!draggable || !isMinimized) return;

    const moveHandler = (e) => handleDragMove(e);
    const endHandler = (e) => handleDragEnd(e);

    window.addEventListener('touchmove', moveHandler, { passive: false });
    window.addEventListener('touchend', endHandler);
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', endHandler);

    return () => {
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', endHandler);
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
    };
  }, [draggable, isMinimized, isMobile]);

  useEffect(() => {
    if (!detectAudio || !isLoaded || !playerRef.current) return;

    let isActive = true;

    const setupAudioDetection = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;
        const destination = audioContext.destination;
        const source = audioContext.createMediaStreamDestination();
        analyser.connect(destination);

        const detectAudioLoop = () => {
          var _a;
          if (!analyserRef.current || !isActive) return;

          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          const threshold = 10;
          const wasTalking = isTalking;
          const nowTalking = average > threshold;
          if (nowTalking !== wasTalking) {
            setIsTalking(nowTalking);
            if ((_a = playerRef.current) == null ? void 0 : _a.animationController) {
              playerRef.current.animationController.setTalkingState(nowTalking);
            }
            if (nowTalking && onTalkStart) {
              onTalkStart();
            } else if (!nowTalking && onTalkEnd) {
              onTalkEnd();
            }
          }
          animationFrameRef.current = requestAnimationFrame(detectAudioLoop);
        };

        const handleVisibilityForAudio = () => {
          if (!document.hidden && isActive && analyserRef.current) {
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }
            detectAudioLoop();
          }
        };

        document.addEventListener('visibilitychange', handleVisibilityForAudio);

        detectAudioLoop();

        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityForAudio);
        };
      } catch (err) {
        console.error("[AniaAvatar] Error setting up audio detection:", err);
      }
    };

    const cleanup = setupAudioDetection();

    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => cleanupFn && cleanupFn());
      }
    };
  }, [detectAudio, isLoaded, onTalkStart, onTalkEnd]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.setTalkingState) {
      playerRef.current.setTalkingState(isTalking);
    }
  }, [isTalking]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && playerRef.current) {
        if (playerRef.current.play && typeof playerRef.current.play === 'function') {
          try {
            playerRef.current.play();
          } catch (err) {
            console.error("[AniaAvatar] Error reactivating:", err);
          }
        }

        // Re-assert the talk state ONLY when this component's own audio
        // detection owns it (detectAudio mode). In chatbot/host-driven mode
        // the local `isTalking` is always false — forcing it here froze the
        // mouth whenever the user returned to the tab mid-speech.
        if (detectAudio && playerRef.current.animationController) {
          playerRef.current.animationController.setTalkingState(isTalking);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const keepaliveInterval = setInterval(() => {
      if (!document.hidden && playerRef.current && isLoaded) {
        if (playerRef.current.play && typeof playerRef.current.play === 'function') {
          try {
            const canvas = playerRef.current.canvas;
            if (canvas && canvas.getContext) {
              const ctx = canvas.getContext('2d');
              if (ctx && playerRef.current.animationController) {
                playerRef.current.play();
              }
            }
          } catch (err) {
            console.warn("[AniaAvatar] Keepalive failed:", err);
          }
        }
      }
    }, 30000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(keepaliveInterval);
    };
  }, [isTalking, isLoaded, detectAudio]);

  useEffect(() => {
    const loadAvatar = async () => {
      var _a, _b, _c;
      console.log('[AniaAvatar] loadAvatar called', { isLoading: isLoadingRef.current, hasAniaPlayer: !!window.AniaPlayer, hasContainer: !!containerRef.current, hasPlayer: !!playerRef.current });
      if (isLoadingRef.current) {
        console.log('[AniaAvatar] Already loading, skipping');
        return;
      }
      if (!window.AniaPlayer) {
        console.error('[AniaAvatar] AniaPlayer not loaded on window');
        setError(tr.t("avatar.error.playerNotLoaded"));
        return;
      }
      if (!containerRef.current) {
        console.warn('[AniaAvatar] containerRef.current is null, skipping');
        return;
      }
      if (playerRef.current) {
        console.log('[AniaAvatar] Player already exists, skipping');
        return;
      }
      isLoadingRef.current = true;
      const startTime = performance.now();
      try {
        let avatarData;
        if (avatarUrl) {
          const fetchStart = performance.now();

          const cachedData = await getCachedAvatar(avatarUrl);

          if (cachedData) {
            if (avatarUrl.endsWith(".ania")) {
              avatarData = cachedData;
            } else {
              avatarData = cachedData;
            }
          } else {
            const fetchOptions = {
              cache: 'force-cache',
            };
            if (authToken) {
              fetchOptions.headers = {
                'Authorization': `Bearer ${authToken}`
              };
            }

            const response = await fetch(avatarUrl, fetchOptions);

            if (!response.ok) {
              throw new Error(`Failed to load avatar: ${response.status} ${response.statusText}`);
            }

            if (avatarUrl.endsWith(".ania")) {
              const encryptedData = await response.arrayBuffer();
              // MARKET v3.0 files are plain JSON — openable without a password,
              // so only require one when the file is actually encrypted.
              if ((avatarPassword === undefined || avatarPassword === null) && !isPlainMarketAnia(encryptedData)) {
                throw new Error(tr.t("avatar.error.passwordRequired"));
              }
              avatarData = await decryptAniaFile(encryptedData, avatarPassword ?? "");

              await setCachedAvatar(avatarUrl, avatarData, true);
            } else {
              avatarData = await response.json();
              await setCachedAvatar(avatarUrl, avatarData, false);
            }
          }
        } else if (externalAvatarData) {
          avatarData = externalAvatarData;
        } else {
          throw new Error(tr.t("avatar.error.noSource"));
        }
        const detectedFps = (_c = avatarData.video) == null ? void 0 : _c.fps;

        // Speed precedence (lowest → highest):
        //   1 (baseline) < fps heuristic < .ania authored speed < explicit host prop.
        // The fps heuristic and the file's authored speeds carry the creator's
        // intent for hosts that DON'T set a speed. But an explicit host prop
        // (e.g. the AvatarConfigurator's Idle/Talk speed sliders) is a
        // deliberate override and must win — previously the file clobbered it,
        // so changing idleSpeed/talkSpeed in the configurator did nothing.
        let finalIdleSpeed = 1;
        let finalTalkSpeed = 1;
        if (autoCalculateSpeed && detectedFps) {
          const optimalSpeeds = calculateOptimalSpeeds(detectedFps);
          finalIdleSpeed = optimalSpeeds.idle;
          finalTalkSpeed = optimalSpeeds.talk;
        }
        const fileAnim = avatarData.animation || {};
        if (typeof fileAnim.idleSpeedSliderValue === 'number' && fileAnim.idleSpeedSliderValue > 0) {
          finalIdleSpeed = fileAnim.idleSpeedSliderValue;
        }
        if (typeof fileAnim.talkSpeedSliderValue === 'number' && fileAnim.talkSpeedSliderValue > 0) {
          finalTalkSpeed = fileAnim.talkSpeedSliderValue;
        }
        if (typeof idleSpeed === 'number' && idleSpeed > 0) finalIdleSpeed = idleSpeed;
        if (typeof talkSpeed === 'number' && talkSpeed > 0) finalTalkSpeed = talkSpeed;

        const PlayerClass = window.AniaPlayer.AniaPlayer || window.AniaPlayer.default || window.AniaPlayer;

        let canvasWidth = width;
        let canvasHeight = height;

        if (preserveQuality && avatarData.video) {
          if (avatarData.video.width && avatarData.video.height) {
            canvasWidth = avatarData.video.width;
            canvasHeight = avatarData.video.height;
          } else if (avatarData.video.frames && avatarData.video.frames.length > 0) {
            const img = new Image();
            img.src = `data:image/webp;base64,${avatarData.video.frames[0]}`;
            img.onload = () => {
              if (playerRef.current && playerRef.current.canvas) {
                playerRef.current.canvas.width = img.width;
                playerRef.current.canvas.height = img.height;
              }
            };
          }
        }

        if (!containerRef.current) {
          console.error('[AniaAvatar] containerRef became null after fetch!');
          isLoadingRef.current = false;
          return;
        }
        console.log('[AniaAvatar] Creating player with container:', containerRef.current, 'size:', canvasWidth, 'x', canvasHeight);
        const player = new PlayerClass(containerRef.current, {
          transparent: true,
          chroma_enabled: false,
          audio_enabled: false,
          width: canvasWidth,
          height: canvasHeight,
          auto_start: false
        });
        player.fileData = avatarData;

        player.canvas.width = canvasWidth;
        player.canvas.height = canvasHeight;
        player.canvas.style.position = 'absolute';
        player.canvas.style.top = '0';
        player.canvas.style.left = '0';
        player.canvas.style.width = '100%';
        player.canvas.style.height = '100%';
        player.canvas.style.objectFit = isMinimized ? 'cover' : 'contain';
        player.canvas.style.display = 'block';

        const animationConfig = {
          ...avatarData.animation,
          idle_range_low: Math.floor(avatarData.animation.idleRangeLowValue || 0),
          idle_range_high: Math.floor(avatarData.animation.idleRangeHighValue || 321),
          talk_range_low: Math.floor(avatarData.animation.talkRangeLowValue || 327),
          talk_range_high: Math.floor(avatarData.animation.talkRangeHighValue || 834),
          current_frame_index: avatarData.animation.currentFrameIndex || 0,
          frame_count: avatarData.video.frames.length,
          is_talking: false,
          is_transitioning: false,
          reverse_idle_selected: avatarData.animation.reverseIdleSelected || false,
          reverse_talk_selected: avatarData.animation.reverseTalkSelected || false,
          idle_speed_slider_value: finalIdleSpeed,
          talk_speed_slider_value: finalTalkSpeed,
          transition_speed_slider_value: avatarData.animation.transitionSpeedSliderValue || 0,
          idle_start_positions: avatarData.animation.idleStartPositions || [],
          talk_start_positions: avatarData.animation.talkStartPositions || []
        };
        const configState = {
          ...avatarData.config,
          idle_frame_duration: avatarData.config.idleFrameDuration || 50,
          talk_cycle_duration: avatarData.config.talkCycleDuration || 50,
          transition_duration: avatarData.config.transitionDuration || 10
        };
        const AnimationController = window.AniaPlayer.AnimationController;
        player.animationController = new AnimationController(
          animationConfig,
          configState,
          avatarData.video.frames.length
        );
        // Action displacement moves (action.displacements[] in the .ania)
        // translate the avatar container while the action plays (browser
        // equivalent of the desktop's OS-window nudge). Target the container
        // div, NOT the canvas: enforceCanvasStyles() strips/overrides the
        // canvas transform on every style mutation. Consumed by the modern
        // player bundle; older bundles ignore the field.
        player.animationController.displacementTarget = containerRef.current || player.canvas;
        // Configure action frames from avatar data
        if (avatarData.actions && avatarData.actions.length > 0 && player.animationController.configureActions) {
          player.animationController.configureActions(avatarData.actions);
        } else if (actions && actions.length > 0 && player.animationController.configureActions) {
          player.animationController.configureActions(actions);
        }

        // Configure lip sync. Priority per knob: explicit component props >
        // values authored into the .ania (lipsync.opennessMap + lipsync.tuning,
        // written by the web studio / desktop) > server config > defaults.
        // A file that carries an authored opennessMap enables lip sync by
        // itself even when the host didn't pass lipSyncEnabled — the creator
        // tuned it. Without a server URL we still configure local lip sync so
        // the knobs apply to audio-driven (FFT) lip sync.
        const fileLipsync = avatarData.lipsync || null;
        const fileTuning = (fileLipsync && fileLipsync.tuning) || null;
        const fileOpennessMap =
          fileLipsync && Array.isArray(fileLipsync.opennessMap) && fileLipsync.opennessMap.length > 0
            ? fileLipsync.opennessMap
            : null;
        const lipSyncActive = lipSyncEnabled || !!fileOpennessMap;
        if (lipSyncActive && player.animationController.configureLipsSync) {
          const applyLipSync = (lipConfig) => {
            const talkLow = Math.floor((avatarData.animation && avatarData.animation.talkRangeLowValue) || 327);
            const talkHigh = Math.floor((avatarData.animation && avatarData.animation.talkRangeHighValue) || 834);
            const openMap = (lipConfig && lipConfig.lips_sync_keyframes)
              ? buildOpennessMap(lipConfig.lips_sync_keyframes, talkLow, talkHigh)
              : fileOpennessMap;
            const sustainStyle = lipSyncSustainStyle
              || (fileTuning && fileTuning.sustainStyle)
              || (lipConfig && lipConfig.lips_sync_sustain_style)
              || 'wiggle';
            const wiggleSpeed = (lipSyncWiggleSpeed != null)
              ? lipSyncWiggleSpeed
              : (fileTuning && fileTuning.wiggleSpeed != null)
                ? fileTuning.wiggleSpeed
                : ((lipConfig && lipConfig.lips_sync_wiggle_speed) || 5);
            const intensity = (fileTuning && fileTuning.intensity != null)
              ? fileTuning.intensity
              : ((lipConfig && lipConfig.lips_sync_sync_intensity) || lipSyncIntensity);
            const responsiveness = (fileTuning && fileTuning.responsiveness != null)
              ? fileTuning.responsiveness
              : ((lipConfig && lipConfig.lips_sync_responsiveness) || lipSyncResponsiveness);
            player.animationController.configureLipsSync(
              true,
              intensity,
              responsiveness,
              openMap,
              sustainStyle,
              wiggleSpeed
            );
          };

          if (lipSyncServerUrl && avatarData.contentHash) {
            fetchLipSyncConfig(lipSyncServerUrl, avatarData.contentHash)
              .then((lipConfig) => applyLipSync(lipConfig))
              .catch((err) => {
                console.warn('[AniaAvatar] Lip sync config fetch failed:', err);
                applyLipSync(null);
              });
          } else {
            applyLipSync(null);
          }
        }

        // Wire lip sync audio callbacks if provided
        if (lipSyncHook && player.animationController) {
          const ctrl = player.animationController;
          ctrl.getAmplitudeFn = lipSyncHook.getAmplitude;
          ctrl.getSpectralOpennessFn = lipSyncHook.getSpectralOpenness;
          ctrl.getSpectralFluxFn = lipSyncHook.getSpectralFlux;
        }

        player.play();
        playerRef.current = player;
        setIsLoaded(true);
        isLoadingRef.current = false;
        console.log('[AniaAvatar] Avatar loaded successfully!');

        if (onLoad) {
          onLoad(player);
        }

        // Trigger initial action after load
        if (initialAction && player.animationController.triggerAction) {
          setTimeout(() => {
            player.animationController.triggerAction(initialAction);
            if (initialActionLoop) {
              player.animationController.onActionCompleteCallback = () => {
                if (initialActionLoop && playerRef.current?.animationController) {
                  setTimeout(() => {
                    playerRef.current.animationController.triggerAction(initialAction);
                  }, 100);
                }
              };
            }
          }, 200);
        }
      } catch (err) {
        console.error("[AniaAvatar] Error loading avatar:", err);
        setError(tr.t("avatar.error.loadFailed", { error: (err && err.message ? err.message : String(err)) }));
        isLoadingRef.current = false;
      }
    };
    console.log('[AniaAvatar] useEffect running, window.AniaPlayer:', !!window.AniaPlayer);
    if (window.AniaPlayer) {
      loadAvatar();
    } else {
      console.log('[AniaAvatar] Waiting for AniaPlayer script...');
      const checkInterval = setInterval(() => {
        if (window.AniaPlayer) {
          console.log('[AniaAvatar] AniaPlayer found after wait!');
          clearInterval(checkInterval);
          loadAvatar();
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
    return () => {
      if (playerRef.current) {
        try {
          if (playerRef.current.stop) {
            playerRef.current.stop();
          }
          if (playerRef.current.animationController) {
            if (playerRef.current.animationController.cleanup) {
              playerRef.current.animationController.cleanup();
            }
            playerRef.current.animationController = null;
          }
          if (playerRef.current.canvas) {
            const ctx = playerRef.current.canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, playerRef.current.canvas.width, playerRef.current.canvas.height);
            }
            // Remove canvas from DOM to prevent ghost elements on remount
            if (playerRef.current.canvas.parentNode) {
              playerRef.current.canvas.parentNode.removeChild(playerRef.current.canvas);
            }
          }
          playerRef.current.fileData = null;
          playerRef.current = null;
        } catch (err) {
          console.error("[AniaAvatar] Error cleaning up:", err);
        }
      }
      isLoadingRef.current = false;
    };
  }, [avatarUrl, avatarPassword, externalAvatarData, authToken, preserveQuality]);

  // Live-apply idle/talk speed when the host changes the props AFTER load — the
  // load effect above resolves speed only once at creation, so without this a
  // configurator slider (or any runtime prop change) never reached the running
  // animation. The browser controller exposes setIdleSpeed/setTalkSpeed — the
  // same path the in-widget speed controls use. Only fires for explicit numeric
  // props, so a host that leaves them unset keeps the file/heuristic speed.
  useEffect(() => {
    if (!isLoaded) return;
    const ctrl = playerRef.current && playerRef.current.animationController;
    if (!ctrl) return;
    if (typeof idleSpeed === 'number' && idleSpeed > 0 && ctrl.setIdleSpeed) {
      ctrl.setIdleSpeed(idleSpeed);
    }
    if (typeof talkSpeed === 'number' && talkSpeed > 0 && ctrl.setTalkSpeed) {
      ctrl.setTalkSpeed(talkSpeed);
    }
  }, [idleSpeed, talkSpeed, isLoaded]);

  const getMobileSize = () => {
    if (isMobile && isMinimized) {
      return { width: mobileMinimizedSize, height: mobileMinimizedSize };
    }
    if (isMinimized) {
      return { width: Math.floor(width / 2), height: Math.floor(height / 2) };
    }
    return { width, height };
  };

  const currentDimensions = getMobileSize();

  // Aplica estilos ao canvas corretos dependendo do estado minimizado
  // Quando minimizado: canvas em tamanho explícito centralizado (mostra o centro do avatar)
  // Quando maximizado: canvas preenche o container
  const enforceCanvasStyles = useCallback(() => {
    if (enforcingRef.current) return;
    const canvas = playerRef.current?.canvas;
    if (!canvas) return;
    enforcingRef.current = true;
    const s = canvas.style;
    if (isMinimized) {
      // Tamanho explícito em px = 50% do tamanho original para manter qualidade
      // Centralizado com transform para mostrar o centro (rosto/corpo) do avatar
      const displayW = Math.floor(width / 2);
      const displayH = Math.floor(height / 2);
      s.setProperty('position', 'absolute', 'important');
      s.setProperty('top', '50%', 'important');
      s.setProperty('left', '50%', 'important');
      s.setProperty('transform', 'translate(-50%, -50%)', 'important');
      s.setProperty('width', displayW + 'px', 'important');
      s.setProperty('height', displayH + 'px', 'important');
      s.setProperty('display', 'block', 'important');
      s.removeProperty('margin');
    } else {
      // Maximizado: preenche o container
      s.setProperty('position', 'absolute', 'important');
      s.setProperty('top', '0', 'important');
      s.setProperty('left', '0', 'important');
      s.setProperty('width', '100%', 'important');
      s.setProperty('height', '100%', 'important');
      s.setProperty('display', 'block', 'important');
      s.removeProperty('transform');
      s.removeProperty('margin');
    }
    enforcingRef.current = false;
  }, [isMinimized, width, height]);

  useEffect(() => {
    enforceCanvasStyles();
  }, [isMinimized, width, height, preserveQuality, isMobile, mobileMinimizedSize, isLoaded, enforceCanvasStyles]);

  // MutationObserver: re-aplica styles se AniaPlayer sobrescrever durante o loop de animação
  useEffect(() => {
    if (!isLoaded || !playerRef.current?.canvas) return;

    const canvas = playerRef.current.canvas;

    // Injeta CSS !important via stylesheet para garantir precedência
    if (!styleTagRef.current) {
      const style = document.createElement('style');
      style.setAttribute('data-ania-canvas-fix', '1');
      style.textContent = '[data-ania-canvas] canvas { display: block !important; }';
      document.head.appendChild(style);
      styleTagRef.current = style;
    }

    // Marca o container com o atributo para o seletor CSS funcionar
    if (containerRef.current) {
      containerRef.current.setAttribute('data-ania-canvas', '1');
    }

    // MutationObserver para re-aplicar se o AniaPlayer alterar o style attribute
    if (canvasObserverRef.current) {
      canvasObserverRef.current.disconnect();
    }
    canvasObserverRef.current = new MutationObserver(() => {
      enforceCanvasStyles();
    });
    canvasObserverRef.current.observe(canvas, { attributes: true, attributeFilter: ['style', 'width', 'height'] });

    return () => {
      if (canvasObserverRef.current) {
        canvasObserverRef.current.disconnect();
        canvasObserverRef.current = null;
      }
    };
  }, [isLoaded, enforceCanvasStyles]);

  const toggleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    if (onToggleMinimize) {
      onToggleMinimize(newMinimizedState);
    }
  };
  const handleClose = () => {
    setIsVisible(false);
    if (canvasObserverRef.current) {
      canvasObserverRef.current.disconnect();
      canvasObserverRef.current = null;
    }
    if (styleTagRef.current && styleTagRef.current.parentNode) {
      styleTagRef.current.parentNode.removeChild(styleTagRef.current);
      styleTagRef.current = null;
    }
    if (playerRef.current) {
      if (playerRef.current.stop) {
        playerRef.current.stop();
      }
      playerRef.current = null;
    }
    if (onClose) {
      onClose();
    }
  };
  if (!isVisible) return null;
  const positionStyles = {
    "bottom-left": { bottom: '24px', left: '24px' },
    "bottom-right": { bottom: '24px', right: '24px' },
    "top-left": { top: '24px', left: '24px' },
    "top-right": { top: '24px', right: '24px' }
  };
  const currentWidth = currentDimensions.width;
  const currentHeight = currentDimensions.height;
  const currentTheme = THEMES[theme] || THEMES.dark;
  const isMobileMinimized = isMobile && isMinimized;

  const getContainerStyle = () => {
    // On a phone, an OPEN widget behaves like a bottom sheet: edge-to-edge
    // (small inset) regardless of the configured corner, so the chat gets the
    // full viewport width instead of a squeezed column pinned to one side.
    const isMobileSheet = isMobile && !isMinimized && !!children;
    const baseStyle = {
      position: inline ? 'relative' : 'fixed',
      transition: 'all 0.3s ease',
      // The widget must NOT inherit the host page's font (a serif host page
      // makes the chat look broken). Own stack, own base color.
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      ...(!inline && !(dragPosition && isMinimized) ? positionStyles[position] : {}),
      ...(isMobileSheet ? { left: '8px', right: '8px', bottom: '8px', top: 'auto' } : {}),
      ...(isMobileMinimized ? {
        borderRadius: '9999px',
        overflow: 'hidden',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)'
      } : {}),
      width: isMobileSheet
        ? 'auto'
        : (isMinimized ? `${currentWidth}px` : `min(${currentWidth}px, calc(100vw - 24px))`),
      height: children ? "auto" : `${currentHeight}px`,
      maxWidth: isMinimized ? undefined : "calc(100vw - 24px)",
      maxHeight: isMobileMinimized ? "none" : (isMobileSheet ? "calc(100vh - 16px)" : "calc(100vh - 24px)"),
      pointerEvents: "auto",
      zIndex: alwaysOnTop ? 2147483647 : 9999,
      display: "flex",
      flexDirection: "column"
    };

    if (dragPosition && isMinimized) {
      return {
        ...baseStyle,
        left: `${dragPosition.x}px`,
        top: `${dragPosition.y}px`,
        transition: isDragging ? 'none' : 'all 0.3s ease',
        cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
        touchAction: 'none'
      };
    }

    if (isMinimized && draggable && !isMobile) {
      return {
        ...baseStyle,
        cursor: 'grab'
      };
    }

    return baseStyle;
  };

  const handleContainerClick = (e) => {
    if (isDragging || hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => { hasDraggedRef.current = false; }, 100);
      return;
    }
    if (minimizable) {
      toggleMinimize();
    }
  };

  const avatarNode = jsx(
    "div",
    {
      ref: outerContainerRef,
      style: getContainerStyle(),
      onTouchStart: isMinimized && draggable ? handleDragStart : undefined,
      onMouseDown: isMinimized && draggable ? handleDragStart : undefined,
      children: jsxs(
        "div",
        {
          style: {
            position: 'relative',
            width: '100%',
            display: "flex",
            flexDirection: "column",
            maxHeight: isMobileMinimized ? undefined : "calc(100vh - 24px)",
            overflow: (!transparent || !isMobileMinimized) ? 'hidden' : undefined,
            ...(
              !transparent ? {
                background: currentTheme.background,
                borderRadius: isMobileMinimized ? '9999px' : '1rem',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                backdropFilter: isMobileMinimized ? 'none' : 'blur(12px)',
                WebkitBackdropFilter: isMobileMinimized ? 'none' : 'blur(12px)'
              } : {
                ...(isMobileMinimized ? { borderRadius: '9999px' } : {})
              }
            )
          },
          children: [
            !isMobileMinimized && ((minimizable) || (closable && !isMinimized)) && jsxs("div", { style: { position: 'absolute', top: '8px', right: '8px', zIndex: 10, display: 'flex', gap: '4px' }, children: [
              minimizable && isMinimized && jsx(
                "button",
                {
                  onClick: toggleMinimize,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: '6px',
                    borderRadius: '8px',
                    transition: 'background-color 0.15s',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: 'none',
                    cursor: 'pointer'
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.7)" : currentTheme.controlHover,
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: tr.t("avatar.title.maximize"),
                  children: jsx(Maximize2, { size: 14, style: { color: "#fff" } })
                }
              ),
              minimizable && !isMinimized && jsx(
                "button",
                {
                  onClick: toggleMinimize,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: '6px',
                    borderRadius: '8px',
                    transition: 'background-color 0.15s',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: 'none',
                    cursor: 'pointer'
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.7)" : currentTheme.controlHover,
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: tr.t("avatar.title.minimize"),
                  children: jsx(Minimize2, { size: 14, style: { color: "#fff" } })
                }
              ),
              closable && !isMinimized && jsx(
                "button",
                {
                  onClick: handleClose,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: '6px',
                    borderRadius: '8px',
                    transition: 'background-color 0.15s',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: 'none',
                    cursor: 'pointer'
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.7)",
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: tr.t("avatar.title.close"),
                  children: jsx(X, { size: 14, style: { color: transparent ? "#fff" : currentTheme.textPrimary } })
                }
              )
            ] }),
            jsxs(
              "div",
              {
                ref: containerRef,
                style: {
                  width: isMobileMinimized ? `${currentWidth}px` : '100%',
                  // On a phone with the chat open, cap the avatar stage so the
                  // conversation (not the canvas) owns the screen.
                  height: (isMobile && !isMinimized && children)
                    ? `min(${currentHeight}px, 34vh)`
                    : `${currentHeight}px`,
                  maxWidth: "100%",
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: minimizable && !isDragging ? 'pointer' : undefined,
                  background: transparent ? "transparent" : "rgba(0,0,0,0.1)",
                  borderRadius: isMobileMinimized ? '9999px' : undefined,
                  position: "relative",
                  overflow: "hidden"
                },
                onClick: handleContainerClick,
                title: minimizable ? (isMinimized ? tr.t("avatar.title.clickToMaximize") : tr.t("avatar.title.clickToMinimize")) : undefined,
                children: [
                  !isLoaded && !error && jsx(
                    "div",
                    {
                      style: {
                        color: currentTheme.textPrimary,
                        position: "relative",
                        zIndex: 1,
                        fontSize: '0.875rem',
                        animation: 'ania-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      },
                      children: tr.t("avatar.loading")
                    }
                  ),
                  error && jsx("div", { style: { color: '#f87171', fontSize: '0.75rem', padding: '8px', textAlign: 'center', position: "relative", zIndex: 1 }, children: error })
                ]
              }
            ),
            children && !isMinimized && jsx("div", { style: { width: '100%', flex: "1 1 auto", minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }, children })
          ]
        }
      )
    }
  );

  // Modo embutido: renderiza no fluxo do pai, sem portal nem position fixed.
  if (inline) {
    return avatarNode;
  }
  // Usa portal para renderizar diretamente no body, evitando qualquer stacking context pai
  if (typeof document !== 'undefined' && document.body) {
    return createPortal(avatarNode, document.body);
  }
  return avatarNode;
});
