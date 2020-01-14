import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {OutletComponent} from './outlet/outlet.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountComponent} from './account/account.component';
import {ImmiHeaderModule} from "../shared/component/immi-header/immi-header.module";


const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
      },
      {
        path: 'auth',
        component: LoginComponent
      },
      {
        path: 'account',
        component: AccountComponent
      }
    ]
  }
];

@NgModule({
  declarations: [AccountComponent, LoginComponent, OutletComponent],
  imports: [ImmiHeaderModule, RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
