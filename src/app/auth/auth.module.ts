import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
