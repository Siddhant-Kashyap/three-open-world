import * as THREE from "three";

export class SceneManager {
  private scene: THREE.Scene;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
  }

  getScene(): THREE.Scene {
    return this.scene;
  }

  add(object: THREE.Object3D): void {
    this.scene.add(object);
  }

  remove(object: THREE.Object3D): void {
    this.scene.remove(object);
  }

  setBackground(color: THREE.Color | string | number): void {
    if (color instanceof THREE.Color) {
      this.scene.background = color;
    } else {
      this.scene.background = new THREE.Color(color);
    }
  }
}
