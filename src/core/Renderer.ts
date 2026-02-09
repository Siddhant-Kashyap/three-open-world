import * as THREE from "three";

export interface RendererConfig {
  antialias?: boolean;
  pixelRatio?: number;
}

export class Renderer {
  private renderer: THREE.WebGLRenderer;
  private container: HTMLElement;

  constructor(container: HTMLElement = document.body, config: RendererConfig = {}) {
    const { antialias = true, pixelRatio = window.devicePixelRatio } = config;
    
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(pixelRatio);
    
    this.container.appendChild(this.renderer.domElement);
  }

  getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
  }

  render(scene: THREE.Scene, camera: THREE.Camera): void {
    this.renderer.render(scene, camera);
  }

  setPixelRatio(ratio: number): void {
    this.renderer.setPixelRatio(ratio);
  }
}
