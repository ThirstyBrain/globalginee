declare module 'svg-canvas' {
    export default class SVGCanvas {
      constructor(width: number, height: number);
      getContext(type: string): CanvasRenderingContext2D;
      toDataURL(type: string): string;
    }
  }
  