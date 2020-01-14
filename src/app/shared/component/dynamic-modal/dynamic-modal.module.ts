import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicModalComponent, DynamicModalComponentExtended} from './dynamic-modal.component';



@NgModule({
  declarations: [
    DynamicModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class DynamicModalModule { }
