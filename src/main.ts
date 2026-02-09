import { Game } from "./core/Game";
import { Player } from "./world/Player";
import { generateTrees } from "./world/Tree";

// Create a custom game class that extends Game
class OpenWorldGame extends Game {
  private player: Player;
  private trees: ReturnType<typeof generateTrees>;
  private lastTime: number = 0;

  constructor() {
    super({
      camera: {
        fov: 75,
        position: { x: 0, y: 3, z: 5 }
      },
      lighting: {
        directionalLight: {
          intensity: 1,
          position: { x: 5, y: 10, z: 5 }
        }
      },
      ground: {
        width: 200,
        height: 200,
        color: 0x228b22
      }
    });

    // Initialize player
    this.player = new Player(this.getSceneManager(), {
      speed: 5,
      position: { x: 0, y: 0, z: 0 }
    });

    // Generate trees
    this.trees = generateTrees(this.getSceneManager(), 50, 200);
  }

  protected update(): void {
    // Calculate delta time for smooth movement
    const currentTime = performance.now();
    const deltaTime = this.lastTime === 0 ? 0.016 : (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Update player movement
    this.player.update(deltaTime);

    // Make camera follow player
    const playerPos = this.player.getPosition();
    const camera = this.getCamera().getCamera();
    
    // Position camera behind and above the player
    camera.position.x = playerPos.x;
    camera.position.y = playerPos.y + 3;
    camera.position.z = playerPos.z + 5;
    
    // Make camera look at player
    camera.lookAt(playerPos.x, playerPos.y + 1, playerPos.z);
  }

  destroy(): void {
    this.player.destroy();
    this.trees.forEach(tree => tree.destroy());
    super.destroy();
  }
}

// Initialize and start the game
const game = new OpenWorldGame();
game.start();

// Export game instance for potential external access
export { game };