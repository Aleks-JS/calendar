import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    return next.handle(this.setRequestHeaders(request));
  }

  private setRequestHeaders(req: HttpRequest<unknown>): HttpRequest<unknown> {
    let headers = req.headers;
    if (!req.url.includes('weather')) {
      headers = headers.append('Authorization', `Basic ${window.btoa('admin' + ':' + 'supersecret')}`);
    }
    return req.clone({
      headers
    });
  }
}
