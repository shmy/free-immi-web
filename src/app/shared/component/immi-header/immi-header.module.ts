import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImmiHeaderComponent} from './immi-header.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ImmiHeaderComponent],
  imports: [
    CommonModule,
    ClickOutsideModule,
    RouterModule,
  ],
  exports: [ImmiHeaderComponent]
})
export class ImmiHeaderModule { }
