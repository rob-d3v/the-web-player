export interface ModelInfo {
  name: string; format: 'vrm' | 'glb'; humanoid: boolean;
  expressions: string[]; actions: { id: string; label: string }[];
  triangles: number; meshes: number;
}
export interface Avatar3DViewer {
  load(buffer: ArrayBuffer, name: string): Promise<ModelInfo>;
  playAction(id: string): void;
  stopAction(): void;
  isActionPlaying(): boolean;
  setIdle(enabled: boolean): void;
  setExpression(name: string, value: number): void;
  setSpeechLevel(value: number): void;
  /** 'full' | 'light' (see quality.js). */
  setQuality(tier: QualityTier): void;
  /** 'bust' (chest up, default) or 'full' body. */
  setFraming(mode: 'bust' | 'full'): void;
  /** Arms/torso from the body tracker, or null. */
  setArms(frame: unknown | null): void;
  /** Extra mouth opening from the microphone level (0..1). */
  setMouthAssist(value: number): void;
  /** Which camera-driven face controls the loaded model supports. */
  faceSupport(): { brows: boolean; tongue: boolean; bored: boolean; smile: boolean; mouth: boolean };
  /** Webcam mirror frame (head angles in radians, VRM convention; expressions 0..1) or null to stop mirroring. */
  setTracking(frame: { head?: { x: number; y: number; z: number } | null; expressions?: Record<string, number> | null } | null): void;
  /** Voice visemes (aa/ih/ou/ee/oh 0..1) or null. */
  setVisemes(values: Record<string, number> | null): void;
  resetCamera(): void;
  dispose(): void;
}
export function createAvatar3DViewer(container: HTMLElement): Avatar3DViewer;

export type QualityTier = 'full' | 'light' | '2d';
export interface BenchResult { webgl: boolean; softwareRenderer: boolean; fps: number | null; memoryGB: number | null; cores: number | null; jsHeapMB: number | null; renderer: string }
export interface TierChoice { tier: QualityTier; reasons: string[]; camera: { allowed: boolean; reason: string } }
export function runQuickBench(options?: { durationMs?: number }): Promise<BenchResult>;
export function chooseTier(measurements?: Partial<BenchResult> & { loadMs?: number }): TierChoice;
export function resolveTier(o?: { saved?: string; recommended?: string }): { tier: QualityTier; source: 'user' | 'auto' | 'default' };
export function readSavedTier(storage?: Storage | null): QualityTier | 'auto';
export function saveTier(storage: Storage | null | undefined, tier: QualityTier | 'auto'): void;
export function tierLabel(tier: QualityTier): string;
export const TIERS: readonly QualityTier[];
export const TIER_SETTINGS: Readonly<Record<QualityTier, { pixelRatioMax: number; fps: number; textureMax: number; antialias: boolean }>>;
export const CAMERA_TEXT: Record<string, string>;
export const CAMERA_MESSAGES: Record<string, string>;
export interface CameraControlProps {
  getPlayer: () => Partial<Avatar3DViewer> | null | undefined;
  text?: Record<string, string>;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  holds?: Record<string, unknown>;
  /** Offer "follow my arms and hands" (default true). */
  bodyTracking?: boolean;
}
export function CameraControl(props: CameraControlProps): import('react').ReactElement;
export function createCameraTracker(options: { onFrame?: (frame: unknown) => void; onState?: (state: string, detail?: { message?: string }) => void; mirror?: boolean; fps?: number }): { start(): Promise<boolean>; stop(): void; recenter(): void; readonly state: string; readonly video: HTMLVideoElement | null };
export function createMicLevel(options: { onLevel?: (level: number, now: number) => void; onState?: (state: string, detail?: { message?: string }) => void }): { start(): Promise<boolean>; stop(): void };
export function createMouthAssist(options?: { enabled?: boolean }): { enabled: boolean; assist: number; setEnabled(v: boolean): void; update(level: number, dtMs: number): number };
