import * as THREE from "three";
import type { SceneManager } from "../core/SceneManager";

export interface GroundConfig {
  width?: number;
  height?: number;
  color?: number | string;
}

export class Ground {
  private sceneManager: SceneManager;
  private mesh!: THREE.Mesh;
  private config: Required<GroundConfig>;

  constructor(sceneManager: SceneManager, config: GroundConfig = {}) {
    this.sceneManager = sceneManager;
    
    this.config = {
      width: 200,
      height: 200,
      color: 0x228b22,
      ...config,
    };

    this.createGround();
  }

  private createGround(): void {
    const geometry = new THREE.PlaneGeometry(this.config.width, this.config.height);
    const material = new THREE.MeshStandardMaterial({ color: this.config.color });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true; // Enable shadow receiving for future use
    
    this.sceneManager.add(this.mesh);
  }

  getMesh(): THREE.Mesh {
    return this.mesh;
  }

  setColor(color: number | string): void {
    if (this.mesh.material instanceof THREE.MeshStandardMaterial) {
      this.mesh.material.color.set(color);
    }
  }
}
