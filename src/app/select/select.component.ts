import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SelectRec} from "../utils/classes/select-rec";
import {CalcRecService} from "../utils/services/calc-rec.service";
import {Block} from "../utils/classes/block";
import {BoardWindowComponent} from "../board-window/board-window.component";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit , AfterViewInit{
  @ViewChildren('can') child:QueryList<BoardWindowComponent>;
  recList : SelectRec[] = [];
  index : number = 0;
  flag : number =0;
  myBlocks : Block[] = [];
  blocksList : Block[][] =[];
  bordL: number =244;
  bordW: number =122;

  constructor(private calcRecService:CalcRecService) { }

  ngOnInit() {
    this.recList.push(new SelectRec(this.index));
  }

  ngAfterViewInit(){
    console.log("hi");
    document.getElementById('bHeight').focus();
  }

  addRow(event: any){
    if(this.recList[this.index].amount){
      this.index++;
      this.recList.push(new SelectRec(this.index));
    }
  }

  ngForCallback(id: number){
    if(id == this.index && this.index >0 && this.flag != this.index ){
      this.flag = this.index;
    document.getElementById('w'+(this.index)).focus();
    }
  }

  onKey(event: any) { // without type info
    console.log(event.target.value);
  }
  onSort1(){
    this.calcRecService.heightFirst(this.recList);
    this.onSubmit();
  }
  onSort2(){
    this.calcRecService.lowFirst(this.recList);
    this.onSubmit();
  }
  onSort3(){
    this.calcRecService.spin(this.recList,true);
    this.onSubmit();
  }
  onSort4(){
    this.calcRecService.spin(this.recList,false);
    this.onSubmit();
  }

  onSubmit(){
    this.blocksList = [];
    this.myBlocks = this.calcRecService.convertRectToBlock(this.recList);
    this.calcRecService.sortBlocks(this.myBlocks);
    this.findAndDrawBoards(this.myBlocks);
  }
  findAndDrawBoards(userRec : Block[]){
    // this.myBlocks = [new Block(200,150), new Block(190,40), new Block(90,20), new Block(90,20),
    //   new Block(60,30), new Block(50,450), new Block(200,20), new Block(40,20)];
    let fitTempList : Block[]=[];
    let notFitTempList : Block[] =[];

    this.calcRecService.init(this.bordL,this.bordW);
    this.calcRecService.fit(userRec);
    userRec.forEach((block, index)=>{
      if(block.fit){
        fitTempList.push(block)
      }else {
        notFitTempList.push(block)
      }
    });
    this.blocksList.push(fitTempList);
    if(notFitTempList.length > 0){
      console.log(notFitTempList.length+" Boards Not Fit");
      this.findAndDrawBoards(notFitTempList);
    }
    // this.child._results.forEach((comp)=>{
    //   comp.run();
    // })
  }

}
