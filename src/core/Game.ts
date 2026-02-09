import { SceneManager } from "./SceneManager";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Lighting } from "../world/Lighting";
import { Ground } from "../world/Ground";
import { WindowResize } from "../utils/WindowResize";
import type { CameraConfig } from "./Camera";
import type { RendererConfig } from "./Renderer";
import type { LightingConfig } from "../world/Lighting";
import type { GroundConfig } from "../world/Ground";

export interface GameConfig {
  camera?: CameraConfig;
  renderer?: RendererConfig;
  lighting?: LightingConfig;
  ground?: GroundConfig;
}

export class Game {
  private sceneManager: SceneManager;
  private camera: Camera;
  private renderer: Renderer;
  private lighting: Lighting;
  private ground: Ground;
  private windowResize: WindowResize;
  private animationId: number | null = null;
  private isRunning: boolean = false;

  constructor(config: GameConfig = {}) {
    // Initialize core systems
    this.sceneManager = new SceneManager();
    this.camera = new Camera(config.camera);
    this.renderer = new Renderer(document.body, config.renderer);
    
    // Initialize world
    this.lighting = new Lighting(this.sceneManager, config.lighting);
    this.ground = new Ground(this.sceneManager, config.ground);
    
    // Initialize utilities
    this.windowResize = new WindowResize(this.camera, this.renderer);
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.animate();
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = (): void => {
    if (!this.isRunning) return;
    
    this.animationId = requestAnimationFrame(this.animate);
    this.update();
    this.render();
  };

  protected update(): void {
    // Override this method in subclasses or extend Game class
    // Example: camera movement, game logic, etc.
    const camera = this.camera.getCamera();
    camera.position.z -= 0.01;
  }

  protected render(): void {
    this.renderer.render(
      this.sceneManager.getScene(),
      this.camera.getCamera()
    );
  }

  // Getters for accessing game systems
  getSceneManager(): SceneManager {
    return this.sceneManager;
  }

  getCamera(): Camera {
    return this.camera;
  }

  getRenderer(): Renderer {
    return this.renderer;
  }

  getLighting(): Lighting {
    return this.lighting;
  }

  getGround(): Ground {
    return this.ground;
  }

  destroy(): void {
    this.stop();
    this.windowResize.destroy();
    // Clean up Three.js resources if needed
  }
}
