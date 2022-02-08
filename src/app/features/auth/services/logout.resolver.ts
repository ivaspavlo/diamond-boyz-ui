import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Router
} from '@angular/router';
import { AuthService } from '@app/core/services';


@Injectable({
  providedIn: 'root'
})
export class LogoutResolver implements Resolve<void> {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.authService.logout();
    // FIXME
    this.router.navigate(['..'], {replaceUrl: true});
  }
}
