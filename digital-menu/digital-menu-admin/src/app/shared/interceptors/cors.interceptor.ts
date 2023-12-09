import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedReq: HttpRequest<any> = request;
    const headers = request.headers;
    // .set(
    //   'Cache-Control',
    //   'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
    // )
    // .set('Pragma', 'no-cache')
    // .set('Expires', '0');
    modifiedReq = request.clone({
      headers,
    });
    return next.handle(modifiedReq);
  }
}
