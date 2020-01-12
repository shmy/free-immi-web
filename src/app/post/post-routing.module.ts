import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {ViewComponent} from './view/view.component';
import {ImmiHeaderComponent} from '../shared/component/immi-header/immi-header.component';
import {OutletComponent} from './outlet/outlet.component';
import {ImmiPostItemComponent} from '../shared/component/immi-post-item/immi-post-item.component';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {MakeComponent} from './make/make.component';
import {RichEditorComponent} from '../shared/component/rich-editor/rich-editor.component';
import {FormsModule} from '@angular/forms';
import {ImmiBackTopComponent} from '../shared/component/immi-back-top/immi-back-top.component';
import {TimeAgoModule} from '../shared/pipe/time-ago/time-ago.module';
import {KeepScrollPositionModule} from '../shared/directive/keep-scroll-position/keep-scroll-position.module';
import {ImgLazyLoadModule} from '../shared/directive/img-lazy-load/img-lazy-load.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {ImmiLoadingBarComponent} from '../shared/component/immi-loading-bar/immi-loading-bar.component';
import {PostListSkeletonComponent} from './skeleton/post-list-skeleton/post-list-skeleton.component';
import {PostMainSkeletonComponent} from './skeleton/post-main-skeleton/post-main-skeleton.component';
import {DomSanitizerModule} from '../shared/pipe/dom-sanitizer/dom-sanitizer.module';
import {PostViewSkeletonComponent} from "./skeleton/post-view-skeleton/post-view-skeleton.component";

const routes: Routes = [
  {
    path: '',
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
    PostViewSkeletonComponent,
    PostMainSkeletonComponent,
    PostListSkeletonComponent,
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
    ImmiLoadingBarComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    KeepScrollPositionModule,
    TimeAgoModule,
    ImgLazyLoadModule,
    NgxSkeletonLoaderModule,
    DomSanitizerModule,
  ],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
