import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicModalComponent, InsertionDirective} from './dynamic-modal.component';



@NgModule({
  declarations: [
    DynamicModalComponent,
    InsertionDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class DynamicModalModule { }
