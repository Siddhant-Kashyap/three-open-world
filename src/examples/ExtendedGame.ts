/**
 * Example: How to extend the Game class to add custom game logic
 * 
 * This demonstrates how you can create your own game class that extends
 * the base Game class to add player controls, game objects, etc.
 */

import { Game } from "../core/Game";
import * as THREE from "three";

export class ExtendedGame extends Game {
  private cube: THREE.Mesh | null = null;
  private rotationSpeed: number = 0.01;

  // Override the constructor to add custom initialization
  constructor() {
    super({
      // Customize your game config here
      camera: {
        position: { x: 0, y: 5, z: 10 }
      }
    });

    this.initCustomObjects();
  }

  private initCustomObjects(): void {
    // Example: Add a rotating cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(0, 1, 0);
    this.cube.castShadow = true;
    
    this.getSceneManager().add(this.cube);
  }

  // Override update to add custom game logic
  protected update(): void {
    super.update(); // Call parent update if needed
    
    // Custom update logic
    if (this.cube) {
      this.cube.rotation.x += this.rotationSpeed;
      this.cube.rotation.y += this.rotationSpeed;
    }
  }

  // Override destroy to clean up custom resources
  destroy(): void {
    if (this.cube) {
      this.getSceneManager().remove(this.cube);
      this.cube.geometry.dispose();
      if (this.cube.material instanceof THREE.Material) {
        this.cube.material.dispose();
      }
    }
    
    super.destroy();
  }
}
