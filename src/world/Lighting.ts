import * as THREE from "three";
import type { SceneManager } from "../core/SceneManager";

export interface LightingConfig {
  directionalLight?: {
    color?: number | string;
    intensity?: number;
    position?: { x: number; y: number; z: number };
  };
  ambientLight?: {
    color?: number | string;
    intensity?: number;
  };
}

export class Lighting {
  private sceneManager: SceneManager;
  private directionalLight!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;
  private config: {
    directionalLight: {
      color: number | string;
      intensity: number;
      position: { x: number; y: number; z: number };
    };
    ambientLight: {
      color: number | string;
      intensity: number;
    };
  };

  constructor(sceneManager: SceneManager, config: LightingConfig = {}) {
    this.sceneManager = sceneManager;
    
    const defaultDirLight = {
      color: 0xffffff,
      intensity: 1,
      position: { x: 5, y: 10, z: 5 },
    };
    
    const defaultAmbLight = {
      color: 0xffffff,
      intensity: 0.4,
    };
    
    this.config = {
      directionalLight: {
        ...defaultDirLight,
        ...config.directionalLight,
        position: config.directionalLight?.position ?? defaultDirLight.position,
      },
      ambientLight: {
        ...defaultAmbLight,
        ...config.ambientLight,
      },
    };

    this.setupLights();
  }

  private setupLights(): void {
    // Directional Light (Sun)
    const dirConfig = this.config.directionalLight;
    this.directionalLight = new THREE.DirectionalLight(
      dirConfig.color,
      dirConfig.intensity
    );
    this.directionalLight.position.set(
      dirConfig.position.x,
      dirConfig.position.y,
      dirConfig.position.z
    );
    this.sceneManager.add(this.directionalLight);

    // Ambient Light
    const ambConfig = this.config.ambientLight;
    this.ambientLight = new THREE.AmbientLight(ambConfig.color, ambConfig.intensity);
    this.sceneManager.add(this.ambientLight);
  }

  getDirectionalLight(): THREE.DirectionalLight {
    return this.directionalLight;
  }

  getAmbientLight(): THREE.AmbientLight {
    return this.ambientLight;
  }

  updateDirectionalLightPosition(x: number, y: number, z: number): void {
    this.directionalLight.position.set(x, y, z);
  }
}
