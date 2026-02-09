import type { Camera } from "../core/Camera";
import type { Renderer } from "../core/Renderer";

export class WindowResize {
  private camera: Camera;
  private renderer: Renderer;
  private boundHandleResize: () => void;

  constructor(camera: Camera, renderer: Renderer) {
    this.camera = camera;
    this.renderer = renderer;
    this.boundHandleResize = this.handleResize.bind(this);
    
    window.addEventListener("resize", this.boundHandleResize);
  }

  private handleResize(): void {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera.updateAspect(aspect);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  destroy(): void {
    window.removeEventListener("resize", this.boundHandleResize);
  }
}
