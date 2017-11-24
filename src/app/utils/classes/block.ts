export class Block {
  x : number;
  y: number;
  w: number;
  h: number;
  down?: Block;
  right? : Block;
  fit?: any;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
  }
}
