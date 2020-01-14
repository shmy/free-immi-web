import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImmiCropperComponent } from './immi-cropper.component';



@NgModule({
  declarations: [ImmiCropperComponent],
  imports: [
    CommonModule
  ],
  exports: [ImmiCropperComponent]
})
export class ImmiCropperModule { }
