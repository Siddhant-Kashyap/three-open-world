// Common types and interfaces for the game

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface GameEntity {
  update(deltaTime: number): void;
  destroy(): void;
}

export interface Updatable {
  update(deltaTime: number): void;
}

export interface Disposable {
  destroy(): void;
}
