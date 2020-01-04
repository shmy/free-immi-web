import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {DetailComponent} from './detail/detail.component';
import {IndexComponent} from './index/index.component';
import {ImmiHeaderComponent} from '../shared/immi-header/immi-header.component';
import {OutletComponent} from './outlet/outlet.component';
import {ImmiPostItemComponent} from '../shared/immi-post-item/immi-post-item.component';
import {CommonModule} from '@angular/common';


const routes: Routes = [
  {
    path: 'post',
    component: OutletComponent,
    children: [
      // 帖子分类
      {
        path: '',
        component: IndexComponent
      },
      // 帖子分类
      {
        path: 'category/:id',
        component: ListComponent
      },
      // 发表帖子
      {
        path: 'create/:id',
        component: CreateComponent
      },
      // 帖子详情
      {
        path: 'detail/:id',
        component: DetailComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    ImmiPostItemComponent,
    ImmiHeaderComponent,
    OutletComponent,
    IndexComponent,
    ListComponent,
    CreateComponent,
    DetailComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
