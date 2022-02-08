import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AuthService } from '@app/core/services';
import { Router } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {
        switch (res.status) {
          case 401:
            if (request.url.endsWith('/auth/refresh/')) {
              this.authService.logout();
            }
            return this.handleUnauthorized(request, next);

          case 404:
            const marketPlaceDetail = Boolean(request.url.split('/nfts/')[1]?.length);
            // FIXME: temporary fix
            if (request.url.endsWith('/qr/') || marketPlaceDetail) {
              return throwError(res.error);
            }
            return this.router.navigateByUrl(CORE_ROUTE_NAMES.NOT_FOUND, {replaceUrl: true})
        }
        return throwError(res.error);
      })
    );
  }

  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<unknown> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshToken$.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(({access}) => {
          this.isRefreshing = false;
          this.refreshToken$.next(access);
          return next.handle(this.addToken(request, access))
        }),
        catchError((error: any) => {
          this.authService.logout();
          return of(error)
        })
      );
    }

    return this.refreshToken$.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addToken(request, jwt));
      }),
      catchError((_err) =>  {
        this.authService.logout();
        return of (null)
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
