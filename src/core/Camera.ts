import * as THREE from "three";

export interface CameraConfig {
  fov?: number;
  near?: number;
  far?: number;
  position?: { x: number; y: number; z: number };
}

export class Camera {
  private camera: THREE.PerspectiveCamera;
  private defaultConfig: Required<CameraConfig> = {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 2, z: 5 },
  };

  constructor(config: CameraConfig = {}) {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    this.camera = new THREE.PerspectiveCamera(
      finalConfig.fov,
      window.innerWidth / window.innerHeight,
      finalConfig.near,
      finalConfig.far
    );
    
    this.camera.position.set(
      finalConfig.position.x,
      finalConfig.position.y,
      finalConfig.position.z
    );
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  updateAspect(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  setPosition(x: number, y: number, z: number): void {
    this.camera.position.set(x, y, z);
  }

  getPosition(): THREE.Vector3 {
    return this.camera.position.clone();
  }
}
