import {ActivatedRouteSnapshot, DetachedRouteHandle, Router, RouteReuseStrategy} from '@angular/router';
import {Location} from '@angular/common';
import {forwardRef, Inject} from '@angular/core';
// 缓存时间 单位: 秒
const cacheTime = 60 * 5;

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private cacheRouters: { [key: string]: any } = {};

  // https://stackoverflow.com/questions/37997824/exception-cant-resolve-all-parameters
  constructor(@Inject(forwardRef(() => Location)) public location: Location) {
  }

  // 获取存储路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const c = this.cacheRouters[route.routeConfig.path];
    if (c) {
      return c.handle;
    }
    return null;
  }

  // 是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const c = this.cacheRouters[route.routeConfig.path];
    return c && +(Date.now() / 1000) - c.time < cacheTime;
  }

  // 是否允许复用路由
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.data.keep;
  }

  // 进入路由触发，是否同一路由时复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  // 当路由离开时会触发，存储路由
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    this.cacheRouters[route.routeConfig.path] = {
      snapshot: route,
      handle,
      time: +(Date.now() / 1000)
    };
  }
}
