import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeepScrollPositionDirective} from './keep-scroll-position.directive';



@NgModule({
  declarations: [
    KeepScrollPositionDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeepScrollPositionDirective
  ]
})
export class KeepScrollPositionModule { }
