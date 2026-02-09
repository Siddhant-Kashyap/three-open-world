import { Game } from "./core/Game";

// Initialize and start the game
const game = new Game({
  // Optional: Customize game configuration
  // camera: {
  //   fov: 75,
  //   position: { x: 0, y: 2, z: 5 }
  // },
  // lighting: {
  //   directionalLight: {
  //     intensity: 1,
  //     position: { x: 5, y: 10, z: 5 }
  //   }
  // },
  // ground: {
  //   width: 200,
  //   height: 200,
  //   color: 0x228b22
  // }
});

game.start();

// Export game instance for potential external access
export { game };