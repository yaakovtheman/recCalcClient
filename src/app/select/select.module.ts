import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import {FormsModule} from "@angular/forms";
import {BoardWindowComponent} from "../board-window/board-window.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SelectComponent,BoardWindowComponent],
  exports: [SelectComponent]
})
export class SelectModule { }
