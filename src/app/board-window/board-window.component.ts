import {Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Block} from "../utils/classes/block";

@Component({
  selector: 'app-board-window',
  templateUrl: './board-window.component.html',
  styleUrls: ['./board-window.component.css']
})
export class BoardWindowComponent implements OnInit,AfterViewInit {
  get blocks(): Block[] {
    return this._blocks;
  }
  @Input()
  set blocks(value: Block[]) {
    this._blocks = value;
    console.log(value);
  }
  @ViewChild('someVar') el:ElementRef;
  examples: any = document.getElementById('examples');
  canvas: any;
  draw: any;
  private _blocks: Block[];
  @Input()root: Block;
  @Input()boardW: number;
  @Input()boardH: number;
  @Input()amount?: number;
  constructor() {

  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.init();
  }

    Drawer : any = {};

    init(){
      // this.canvas =   document.getElementById('myCanvas');
      this.canvas = this.el.nativeElement;
      this.draw = this.canvas.getContext("2d");
      this.run();
    }
    run() {
      this.root = this._blocks[0];
      // this.reset(0, 0);
      this.setBlocks(this._blocks);
      this.boundary(this.root);
      this.report(this._blocks, this.root.w, this.root.h);
    }


    report(blocks, w, h) {
      var fit = 0, nofit = [], block, n, len = blocks.length;
      for (n = 0 ; n < len ; n++) {
        block = blocks[n];
        if (block.fit)
          fit = fit + block.area;
        else
          nofit.push("" + block.w + "x" + block.h);
      }
      // this.Drawer.el.ratio.text(Math.round(100 * fit / (w * h)));
      // this.Drawer.el.nofit.html("Did not fit (" + nofit.length + ") :<br>" + nofit.join(", ")).toggle(nofit.length > 0);
    }

      reset(width, height) {
        this.canvas.width  = width  + 1; // add 1 because we draw boundaries offset by 0.5 in order to pixel align and get crisp boundaries
        this.canvas.height = height + 1; // (ditto)
        this.draw.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      rect(x, y, w, h, color) {
        this.draw.fillStyle = color;
        this.draw.fillRect(x + 0.5, y + 0.5, w, h);
        this.draw.fillStyle = "black";
        if(w<40){
          this.draw.font = "bold 7pt Courier";
        }else {
          this.draw.font = "bold 10pt Courier";
        }

        this.draw.fillText(w+"x"+h,x+4,y+15);
        this.draw.stroke();
      }

      stroke(x, y, w, h) {
        this.draw.strokeRect(x + 0.5, y + 0.5, w, h);
      }

      setBlocks(blocks: Block[]) {
        var n, block;
        for (n = 0 ; n < blocks.length ; n++) {
          block = blocks[n];
          if (block.fit)
            this.rect(block.fit.x, block.fit.y, block.w, block.h, this.color(n));
        }
        if(this.amount){
          this.draw.font = "bold 52pt Courier";
          this.draw.strokeText("x "+this.amount,20,70);
        }


      }

      boundary(node) {
        if (node) {
          this.stroke(node.x, node.y, node.w, node.h);
          this.boundary(node.down);
          this.boundary(node.right);
        }
      }


    colors= {

      pastel :         [ "#cec67b", "#FFA5E0", "#A5B3FF", "#abe28f", "#FFCBA5" ],
      basic:         [ "silver", "gray", "red", "maroon", "yellow", "olive", "lime", "green", "aqua", "teal", "blue", "navy", "fuchsia", "purple" ],
      gray:           [ "#111", "#222", "#333", "#444", "#555", "#666", "#777", "#888", "#999", "#AAA", "#BBB", "#CCC", "#DDD", "#EEE" ],
      vintage:       [ "#EFD279", "#95CBE9", "#024769", "#AFD775", "#2C5700", "#DE9D7F", "#7F9DDE", "#00572C", "#75D7AF", "#694702", "#E9CB95", "#79D2EF" ],
      solarized:     [ "#b58900", "#cb4b16", "#dc322f", "#d33682", "#6c71c4", "#268bd2", "#2aa198", "#859900" ],
      none:          [ "transparent" ]
    };

    color(n : number){
      var cols = this.colors.pastel;
      return cols[n % cols.length];
    }



}
