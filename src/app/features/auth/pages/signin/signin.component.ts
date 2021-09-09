import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@app/core/services';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {

  public hasMetamask = true;
  public account$: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.connectMetamask();
    this.hasMetamask = this.authService.hasMetamaskInstalled();
    this.account$ = this.authService.account$;
  }

  public onConnect(): void {
    this.authService.connectMetamask();
  }

}
