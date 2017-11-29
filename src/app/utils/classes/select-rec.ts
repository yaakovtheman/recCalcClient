export class SelectRec {
  id : number;
  width: number;
  height : number;
  amount : number;
  isError? : boolean

  constructor(id: number) {
    this.id = id;
  }
}
