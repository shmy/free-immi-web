import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {ProfileService} from '../../profile/profile.service';
import {catchError, filter, map, retry, timeout} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(
    private profileService: ProfileService,
    private toastrService: ToastrService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const token = this.profileService.getToken();
    const clonedRequest = req.clone({
      headers: req.headers.append('Authorization', token)
    });
    return next.handle(clonedRequest)
      .pipe(
        timeout(10000),
        filter(event => {
          return event instanceof HttpResponse;
        }),
        retry(2),
        catchError((err: HttpErrorResponse) => {
          return of(new HttpResponse({
            body: new HttpResponseCustomError(`${err.statusText}: ${err.message}`, this.toastrService)
          }));
        }),
        map((res: HttpResponse<any>) => {
          let body = [];
          if (res.body instanceof HttpResponseCustomError) {
            body = [null, res.body];
          } else {
            body = [res.body, null];
          }
          return new HttpResponse({body});
        }),
      );
  }
}

class HttpResponseCustomError extends Error {
  constructor(message: string, private toastrService: ToastrService) {
    super(message);
  }

  showToast() {
    console.log(this.stack)
    this.toastrService.error(this.message, '出错了');
  }
}

export type HasHttpResponseCustomError = HttpResponseCustomError | null;
