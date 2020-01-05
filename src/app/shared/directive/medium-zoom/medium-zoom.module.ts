import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumZoomDirective } from './medium-zoom.directive';



@NgModule({
  declarations: [MediumZoomDirective],
  imports: [
    CommonModule
  ],
  exports: [MediumZoomDirective]
})
export class MediumZoomModule { }
