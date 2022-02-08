import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@app/core/services';
import { Urls } from '@app/core/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.checkLogin(state.url);
    if (!isLoggedIn) {
      this.router.navigateByUrl(Urls.LOGIN_URL);
    }
    return isLoggedIn;
  }

  public canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.checkLogin(route.path);
    if (!isLoggedIn) {
      this.router.navigate([Urls.LOGIN_URL]);
    }
    return isLoggedIn;
  }

  private checkLogin(redirectURL: unknown): boolean {
    this.authService.redirectURL = typeof redirectURL === 'string' ? redirectURL : '';
    return !!this.authService.getToken();
  }

}
