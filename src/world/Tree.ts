import * as THREE from "three";
import type { SceneManager } from "../core/SceneManager";

export interface TreeConfig {
  position?: { x: number; y: number; z: number };
  trunkHeight?: number;
  trunkRadius?: number;
  foliageRadius?: number;
}

export class Tree {
  private group: THREE.Group;
  private trunk: THREE.Mesh;
  private foliage: THREE.Mesh;

  constructor(sceneManager: SceneManager, config: TreeConfig = {}) {
    this.group = new THREE.Group();
    
    const trunkHeight = config.trunkHeight || 2;
    const trunkRadius = config.trunkRadius || 0.2;
    const foliageRadius = config.foliageRadius || 1.5;
    
    // Create trunk (cylinder)
    const trunkGeometry = new THREE.CylinderGeometry(
      trunkRadius,
      trunkRadius * 1.2,
      trunkHeight,
      8
    );
    const trunkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8b4513 // Brown
    });
    this.trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    this.trunk.position.y = trunkHeight / 2;
    this.trunk.castShadow = true;
    this.trunk.receiveShadow = true;
    
    // Create foliage (cone)
    const foliageGeometry = new THREE.ConeGeometry(
      foliageRadius,
      trunkHeight * 0.8,
      8
    );
    const foliageMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x228b22 // Forest green
    });
    this.foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    this.foliage.position.y = trunkHeight + (trunkHeight * 0.8) / 2;
    this.foliage.castShadow = true;
    this.foliage.receiveShadow = true;
    
    this.group.add(this.trunk);
    this.group.add(this.foliage);
    
    // Set position
    const position = config.position || { x: 0, y: 0, z: 0 };
    this.group.position.set(position.x, position.y, position.z);
    
    sceneManager.add(this.group);
  }

  getGroup(): THREE.Group {
    return this.group;
  }

  getPosition(): THREE.Vector3 {
    return this.group.position.clone();
  }

  destroy(): void {
    this.trunk.geometry.dispose();
    if (this.trunk.material instanceof THREE.Material) {
      this.trunk.material.dispose();
    }
    this.foliage.geometry.dispose();
    if (this.foliage.material instanceof THREE.Material) {
      this.foliage.material.dispose();
    }
  }
}

// Helper function to generate multiple trees
export function generateTrees(
  sceneManager: SceneManager,
  count: number = 50,
  worldSize: number = 200
): Tree[] {
  const trees: Tree[] = [];
  
  for (let i = 0; i < count; i++) {
    // Random position within world bounds
    const x = (Math.random() - 0.5) * worldSize;
    const z = (Math.random() - 0.5) * worldSize;
    
    // Randomize tree size slightly
    const trunkHeight = 1.5 + Math.random() * 1.5;
    const trunkRadius = 0.15 + Math.random() * 0.1;
    const foliageRadius = 1 + Math.random() * 1;
    
    const tree = new Tree(sceneManager, {
      position: { x, y: 0, z },
      trunkHeight,
      trunkRadius,
      foliageRadius,
    });
    
    trees.push(tree);
  }
  
  return trees;
}
