import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SelectRec} from "../utils/classes/select-rec";
import {CalcRecService} from "../utils/services/calc-rec.service";
import {Block} from "../utils/classes/block";
import {BoardWindowComponent} from "../board-window/board-window.component";
import {Board} from "../utils/classes/board";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit , AfterViewInit{
  @ViewChildren('can') child:QueryList<BoardWindowComponent>;
  hideSelect : boolean = false;
  recList : SelectRec[] = [];
  index : number;
  flag : number =0;
  myBlocks : Block[] = [];
  boards : Board[] =[];
  boardsList : Set<Board[]>;
  boardsGui : Board[];
  bordL: number =122;
  bordW: number =244;
  control: number = 0;
  algoPlace : number;

  constructor(private calcRecService:CalcRecService) { }

  ngOnInit() {
    this.boardsList  = new Set<Board[]>();
    this.boardsGui = [];
    this.index =0;
    this.algoPlace = 0;
    this.recList = [];
    this.recList.push(new SelectRec(this.index));
  }

  ngAfterViewInit(){
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



  nextAlgo(){
    if(this.boardsList.size == this.algoPlace+1){
      this.algoPlace = 0;
    }else {
      this.algoPlace++;
    }
    this.boardsGui =   Array.from(this.boardsList)[this.algoPlace];
  }


  onSubmit() : Board[]{
    this.boards = [];
    this.control = 0;
    this.myBlocks = this.calcRecService.convertRectToBlock(this.recList);
    this.calcRecService.sortBlocks(this.myBlocks);
    return this.findAndDrawBoards(this.myBlocks);
  }

  findAlgo(){
    if(!this.recList[this.recList.length-1].amount)
      this.recList.pop();
    this.boardsList = new Set<Board[]>();
    this.calcRecService.heightFirst(this.recList);
    let obj = this.onSubmit();
    if(obj)
    this.boardsList.add(obj);
    this.calcRecService.lowFirst(this.recList);
     obj = this.onSubmit();
    if(obj)
    this.boardsList.add(obj);
    for (let i=1; i<this.recList.length; i++) {
      this.calcRecService.spin(this.recList,i+1);
      obj = this.onSubmit();
      if(obj)
        this.boardsList.add(obj);
    }
    this.boardsGui =   Array.from(this.boardsList)[this.algoPlace];
    this.hideSelect = true;
  }
  maxW(index)
  {
    if(this.recList[index].width > this.bordW){
      this.recList[index].width = this.bordW;
      this.recList[index].isError= true
    }
  }

  maxH(index)
  {
    if(this.recList[index].height > this.bordL){
      this.recList[index].height= this.bordL;
      this.recList[index].isError= true;
    }

  }


  findAndDrawBoards(userRec : Block[]): Board[]{
    this.control ++;
    let fitTempList : Block[]=[];
    let notFitTempList : Block[] =[];
    this.calcRecService.init(this.bordW,this.bordL);
    this.calcRecService.fit(userRec);
    userRec.forEach((block, index)=>{
      if(block.fit){
        fitTempList.push(block)
      }else {
        notFitTempList.push(block)
      }
    });
    this.boards.push(new Board(fitTempList));
    if(notFitTempList.length > 0 && this.control < 500){
      this.findAndDrawBoards(notFitTempList);
      if(this.control == 500){
        return null;
      }
    }
      return this.boards;
  }

  print(){
    window.print();
  }

}
