// This custom type declaration file overrides the problematic types from @types/p5.
// It provides a simplified but correct structure for the p5 instance, fixing
// numerous TypeScript linting errors related to missing properties and incorrect
// function signatures.

declare module 'p5' {
  class p5 {
    constructor(sketch: (p: p5) => void, node?: HTMLElement | boolean);

    // Properties
    width: number;
    height: number;
    windowWidth: number;
    windowHeight: number;
    frameCount: number;
    deltaTime: number;
    key: string;
    keyCode: number;

    // Methods
    createCanvas(w: number, h: number): p5.Renderer;
    background(r: number, g: number, b: number): void;
    loadImage(path: string): Image;
    image(img: Image, x: number, y: number, w?: number, h?: number): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    stroke(r: number, g: number, b: number): void;
    noStroke(): void;
    fill(r: number, g: number, b: number): void;
    textSize(size: number): void;
    textAlign(align: string | number): void;
    text(str: string, x: number, y: number): void;
    random<T>(arr: T[]): T;
    random(min: number, max: number): number;
    resizeCanvas(w: number, h: number): void;
    loop(): void;
    noLoop(): void;

    // Constants
    CENTER: string;
    LEFT: string;
  }

  // Define a simple Image class to satisfy the type checker
  class Image {
    width: number;
    height: number;
  }

  // Define Renderer class
  class Renderer {
    parent(node: HTMLElement | string): void;
  }

  namespace p5 {
    class Renderer {
      parent(node: HTMLElement | string): void;
    }
  }

  export = p5;
}
