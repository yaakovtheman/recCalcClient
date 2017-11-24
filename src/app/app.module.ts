import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {SelectModule} from "./select/select.module";
import {FormsModule} from "@angular/forms";
import {CalcRecService} from "./utils/services/calc-rec.service";
import { BoardWindowComponent } from './board-window/board-window.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SelectModule
  ],
  providers: [CalcRecService,BoardWindowComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
