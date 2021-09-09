import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@app/core/services';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    return token ?
      next.handle(this.addToken(request, token)) :
      next.handle(request);
  }

  private addToken<T>(request: HttpRequest<T>, token: any): HttpRequest<T> {
    return request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

}