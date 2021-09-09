import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
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

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigateByUrl(Urls.LOGIN_URL);
    }
    return isLoggedIn;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate([Urls.LOGIN_URL]);
    }
    return isLoggedIn;
  }

  private isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

}
