import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {OutletComponent} from './outlet/outlet.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: '',
        // pathMatch: 'full',
        component: LoginComponent
      },
      // {
      //   path: 'login',
      //   component: LoginComponent
      // }
    ]
  }
];

@NgModule({
  declarations: [LoginComponent, OutletComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
