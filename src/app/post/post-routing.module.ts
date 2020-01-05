import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {ViewComponent} from './view/view.component';
import {ImmiHeaderComponent} from '../shared/immi-header/immi-header.component';
import {OutletComponent} from './outlet/outlet.component';
import {ImmiPostItemComponent} from '../shared/immi-post-item/immi-post-item.component';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {MakeComponent} from './make/make.component';
import {RichEditorComponent} from '../shared/rich-editor/rich-editor.component';
import {FormsModule} from '@angular/forms';
import {ImmiBackTopComponent} from '../shared/immi-back-top/immi-back-top.component';
import {TimeAgoModule} from '../shared/pipe/time-ago/time-ago.module';
import {KeepScrollPositionModule} from '../shared/directive/keep-scroll-position/keep-scroll-position.module';


const routes: Routes = [
  {
    path: 'post',
    component: OutletComponent,
    children: [
      // 帖子分类
      {
        path: '',
        component: MainComponent
      },
      // 帖子分类
      {
        path: ':id',
        component: ListComponent,
        data: {
          keep: true,
        }
      },
      // 发表帖子
      {
        path: 'make/:id',
        component: MakeComponent
      },
      // 帖子详情
      {
        path: 'view/:id',
        component: ViewComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    ImmiBackTopComponent,
    RichEditorComponent,
    MainComponent,
    MakeComponent,
    ImmiPostItemComponent,
    ImmiHeaderComponent,
    OutletComponent,
    MakeComponent,
    ListComponent,
    ViewComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, KeepScrollPositionModule, TimeAgoModule],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
