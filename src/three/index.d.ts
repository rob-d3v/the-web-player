export interface ModelInfo {
  name: string; format: 'vrm' | 'glb'; humanoid: boolean;
  expressions: string[]; actions: { id: string; label: string }[];
  triangles: number; meshes: number;
}
export type LoadStage = 'parse' | 'textures' | 'shaders' | 'ready';
export interface ViewerStats { tier: 'full' | 'light'; fps: number; pixelRatio: number; antialias: boolean; textures: number; geometries: number; drawCalls: number; triangles: number; lost: boolean }
export interface Avatar3DViewerOptions {
  /** Starting tier. Antialias is fixed when the viewer is created, so pass the tier here. */
  quality?: 'full' | 'light';
  /** The GPU dropped the 3D (driver reset, memory). The viewer stops drawing; show the 2D. */
  onContextLost?: () => void;
  /** Frame rate stayed far below target: full -> light is applied automatically; light -> 2d is only reported. */
  onSlow?: (info: { from: 'full' | 'light'; to: 'light' | '2d'; fps: number }) => void;
}
export interface Avatar3DViewer {
  /** Loading runs in short tasks (parse, textures one by one, async shader compile) so the page never freezes. */
  load(buffer: ArrayBuffer, name: string, options?: { onProgress?: (stage: LoadStage, fraction: number) => void }): Promise<ModelInfo>;
  getStats(): ViewerStats;
  getQuality(): 'full' | 'light';
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
export function createAvatar3DViewer(container: HTMLElement, options?: Avatar3DViewerOptions): Avatar3DViewer;

export type QualityTier = 'full' | 'light' | '2d';
export interface GPUProbe { webgl: boolean; webgl2: boolean; softwareRenderer: boolean; caveat: boolean; renderer: string; vendor: string; maxTextureSize: number | null; memoryGB: number | null; cores: number | null }
export interface BenchResult extends GPUProbe { fps: number | null; jsHeapMB: number | null }
/** Instant (no drawing) GPU check. */
export function probeGPU(): GPUProbe;
/** probeGPU, then the 1.5 s bench only when it can change the answer. */
export function assessDevice(options?: { durationMs?: number }): Promise<{ measurements: BenchResult; choice: TierChoice }>;
export interface TierChoice { tier: QualityTier; reasons: string[]; camera: { allowed: boolean; reason: string } }
export function runQuickBench(options?: { durationMs?: number }): Promise<BenchResult>;
export function chooseTier(measurements?: Partial<BenchResult> & { loadMs?: number }): TierChoice;
export function resolveTier(o?: { saved?: string; recommended?: string }): { tier: QualityTier; source: 'user' | 'auto' | 'default' };
export function readSavedTier(storage?: Storage | null): QualityTier | 'auto';
export function saveTier(storage: Storage | null | undefined, tier: QualityTier | 'auto'): void;
export function tierLabel(tier: QualityTier): string;
export const TIERS: readonly QualityTier[];
export const TIER_SETTINGS: Readonly<Record<QualityTier, { pixelRatioMax: number; fps: number; textureMax: number; antialias: boolean; outlines: boolean; maxPixels: number }>>;
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
