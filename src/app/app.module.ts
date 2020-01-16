import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {RouteReuseStrategy} from '@angular/router';
import {CustomRouteReuseStrategy} from './shared/strategy/custom-route-reuse.strategy';
import {ToastrModule} from 'ngx-toastr';
import {DynamicModalComponent} from './shared/component/dynamic-modal/dynamic-modal.component';
import {DynamicModalModule} from './shared/component/dynamic-modal/dynamic-modal.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PostRoutingModule} from './post/post-routing.module';
import {ListComponent} from './post/list/list.component';
import {AvatarCropperModalModule} from "./shared/modal/avatar-cropper-modal/avatar-cropper-modal.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NoopInterceptor} from "./shared/http-interceptors/noop-interceptor";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton: true,
    }),
    DynamicModalModule,
    AvatarCropperModalModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER, multi: true, useFactory: () => {
        console.log('APP_INITIALIZER');
        return () => Promise.resolve();
      }
    },
    // 路由复用
    {
      provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy,
    },
    // http 拦截
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DynamicModalComponent]
})
export class AppModule {
}
