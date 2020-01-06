import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {RouteReuseStrategy} from '@angular/router';
import {CustomRouteReuseStrategy} from './shared/strategy/custom-route-reuse.strategy';
import {Location} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
