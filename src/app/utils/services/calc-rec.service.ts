import { Injectable } from '@angular/core';
import {Block} from "../classes/block";
import {SelectRec} from "../classes/select-rec";

@Injectable()
export class CalcRecService {

  constructor() { }
  /******************************************************************************

   This is a very simple binary tree based bin packing algorithm that is initialized
   with a fixed width and height and will fit each block into the first node where
   it fits and then split that node into 2 parts (down and right) to track the
   remaining whitespace.

   Best results occur when the input blocks are sorted by height, or even better
   when sorted by max(width,height).

   Inputs:
   ------

   w:       width of target rectangle
   h:      height of target rectangle
   blocks: array of any objects that have .w and .h attributes

   Outputs:
   -------

   marks each block that fits with a .fit attribute pointing to a
   node with .x and .y coordinates

   Example:
   -------

   var blocks = [
   { w: 100, h: 100 },
   { w: 100, h: 100 },
   { w:  80, h:  80 },
   { w:  80, h:  80 },
   etc
   etc
   ];

   var packer = new Packer(500, 500);
   packer.fit(blocks);

   for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }


   ******************************************************************************/
  root: Block;
  Packer = function(w, h) {
    this.init(w, h);
  };



    init(w, h) {
      this.root = { x: 0, y: 0, w: w, h: h };
    }

    fit(blocks: Block[]) {
      var n, node, block;
      for (n = 0; n < blocks.length; n++) {
        block = blocks[n];
        if (node = this.findNode(this.root, block.w, block.h))
          block.fit = this.splitNode(node, block.w, block.h);
      }
    }

    findNode(root, w, h) {
      if (root.used)
        return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
      else if ((w <= root.w) && (h <= root.h))
        return root;
      else
        return null;
    }

    splitNode(node, w, h) {
      node.used = true;
      node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
      node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
      return node;
    }

    convertRectToBlock(rect : SelectRec[]): Block[]{
      let blockList : Block[] = [];
      rect.forEach((rec)=>{
        for(let i = 0;i < rec.amount;i++)
        blockList.push(new Block(rec.width,rec.height))
      });
      return blockList;
    }

    heightFirst(rect : SelectRec[]){
      rect.forEach((rec)=>{
        if(rec.height<rec.width)
          [rec.height,rec.width] = [rec.width,rec.height];
      })
    }

    lowFirst(rect : SelectRec[]){
      rect.forEach((rec)=>{
        if(rec.height>rec.width)
          [rec.height,rec.width] = [rec.width,rec.height];
      })
    }

  spin(rect : SelectRec[],swich : boolean){
    rect.forEach((rec)=>{
      if(rec.height>rec.width && swich){
        [rec.height,rec.width] = [rec.width,rec.height];
        swich = false;
      }else {
        swich = true;
      }
    })
  }


    sortBlocks(blocks : Block[]){
      blocks.sort(this.compare);
    }

  compare(a: Block,b: Block) {
    if (a.h < b.h)
      return 1;
    if (a.h > b.h)
      return -1;
    return 0;
  }



}
