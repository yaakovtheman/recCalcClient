import {Block} from "./block";

export class Board {
  width : number;
  height : number;
  blocks : Block[];

  constructor(blocks: Block[]) {
    this.blocks = blocks;
  }
}
