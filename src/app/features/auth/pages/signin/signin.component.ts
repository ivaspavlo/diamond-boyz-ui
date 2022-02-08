import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services';
import { ToasterService } from '@app/shared/modules/toaster/services/toaster.service';
import { IAuthResponse } from '@app/interfaces';
import { BehaviorSubject } from 'rxjs';
import {finalize, take} from 'rxjs/operators';
import {WINDOW} from "@app/core/providers";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  public hasMetamask = true;
  public account$: any;

  isProcessing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit(): void { }

  public onConnect(): void {
    this.isProcessing$.next(true);
    this.authService.loginViaMetamask().pipe(
      take(1),
      finalize(() => this.isProcessing$.next(false))
    ).subscribe(
      (res: IAuthResponse) => {
        if (typeof res.errorMsg === 'string') {
          this.toasterService.show({ state: 'error', header: 'Error', text: res.errorMsg });
          // if(res.type === 'NoMetamask') {
          //   this.window.open('https://metamask.io/', '_blank');
          // }
          return
        }
        this.router.navigateByUrl(this.authService.redirectURL || '/profile', {replaceUrl: true});
    });
  }

}
