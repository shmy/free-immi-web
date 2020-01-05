import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'post',
  },
  // 帖子模块
  {
    path: 'post',
    pathMatch: 'prefix',
    loadChildren: () => import('./post/post-routing.module').then(mod => mod.PostRoutingModule),
  },
  // 认证模块
  {
    path: 'auth',
    pathMatch: 'prefix',
    loadChildren: () => import('./auth/auth-routing.module').then(mod => mod.AuthRoutingModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
