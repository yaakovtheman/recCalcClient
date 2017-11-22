import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  createRec(){
    var c = <HTMLCanvasElement>document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(5,30,15,40);
// Red rectangle
    ctx.beginPath();

    ctx.fillText("3 x 4",10,10);
    ctx.strokeText("4 x 5", 20,20);
    ctx.strokeStyle = "red";
    ctx.rect(5, 5, 590, 140);
    ctx.stroke();

// Green rectangle
    ctx.beginPath();
    ctx.fillText("8 x 8",50,50);
    ctx.strokeText("8 x 8", 50,30);
    ctx.strokeStyle = "green";
    ctx.rect(30, 30, 50, 50);
    ctx.stroke();

// Blue rectangle
    ctx.beginPath();
//    ctx.fillText("3 x 4",20,0);
    ctx.strokeStyle = "blue";
    ctx.rect(50, 50, 150, 80);
    ctx.stroke();
  }
}
