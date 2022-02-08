import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IUser } from '@app/core/services';
import { UserMenuItems } from './constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  public userMenuItems = UserMenuItems;
  public userMenuVisible = false;
  public user$: Observable<IUser | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.user$.asObservable();
  }

  public onShowMenu(event: MouseEvent): void {
    if (!this.userMenuVisible) {
      event.stopPropagation();
      this.userMenuVisible = true;
    }
  }

  public onHideMenu(event: MouseEvent): void {
    if (this.userMenuVisible) {
      event.stopPropagation();
      this.userMenuVisible = false;
    }
  }

  public onClickMenuItem(event: MouseEvent, url: string): void {
    this.onHideMenu(event);
    this.router.navigateByUrl(url);
  }

}
