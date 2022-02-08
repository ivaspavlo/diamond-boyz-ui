import {Component, ChangeDetectionStrategy, AfterViewInit} from '@angular/core';
import {AuthService} from "@app/core/services";


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements AfterViewInit {

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.authService.accountsChanged()
  }

}
