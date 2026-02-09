import * as THREE from "three";
import type { SceneManager } from "../core/SceneManager";

export interface PlayerConfig {
  speed?: number;
  position?: { x: number; y: number; z: number };
}

export class Player {
  private sceneManager: SceneManager;
  private mesh: THREE.Mesh;
  private velocity: THREE.Vector3;
  private speed: number;
  private keys: { [key: string]: boolean } = {};
  private group: THREE.Group;

  constructor(sceneManager: SceneManager, config: PlayerConfig = {}) {
    this.sceneManager = sceneManager;
    this.speed = config.speed || 5;
    
    // Create player group
    this.group = new THREE.Group();
    
    // Create player body (cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x4a90e2 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    
    // Create player head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.3;
    head.castShadow = true;
    
    this.group.add(body);
    this.group.add(head);
    
    // Set initial position
    const position = config.position || { x: 0, y: 0, z: 0 };
    this.group.position.set(position.x, position.y, position.z);
    
    // Create a mesh wrapper for the group (for easier access)
    this.mesh = new THREE.Mesh();
    this.mesh.add(this.group);
    
    this.velocity = new THREE.Vector3(0, 0, 0);
    
    this.sceneManager.add(this.mesh);
    this.setupControls();
  }

  private setupControls(): void {
    // Keyboard event listeners
    window.addEventListener("keydown", (event) => {
      this.keys[event.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.key.toLowerCase()] = false;
    });
  }

  update(deltaTime: number): void {
    // Reset velocity
    this.velocity.set(0, 0, 0);

    // Handle WASD movement
    if (this.keys["w"] || this.keys["W"]) {
      this.velocity.z -= 1;
    }
    if (this.keys["s"] || this.keys["S"]) {
      this.velocity.z += 1;
    }
    if (this.keys["a"] || this.keys["A"]) {
      this.velocity.x -= 1;
    }
    if (this.keys["d"] || this.keys["D"]) {
      this.velocity.x += 1;
    }

    // Normalize velocity to ensure consistent speed in all directions
    if (this.velocity.length() > 0) {
      this.velocity.normalize();
      this.velocity.multiplyScalar(this.speed * deltaTime);
      
      // Update position
      this.group.position.add(this.velocity);
      
      // Keep player above ground (y = 0)
      if (this.group.position.y < 0) {
        this.group.position.y = 0;
      }
    }
  }

  getPosition(): THREE.Vector3 {
    return this.group.position.clone();
  }

  getMesh(): THREE.Mesh {
    return this.mesh;
  }

  getGroup(): THREE.Group {
    return this.group;
  }

  destroy(): void {
    // Clean up event listeners
    window.removeEventListener("keydown", () => {});
    window.removeEventListener("keyup", () => {});
    
    // Remove from scene
    this.sceneManager.remove(this.mesh);
    
    // Dispose geometries and materials
    this.group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });
  }
}
