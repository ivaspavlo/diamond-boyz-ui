import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserMenuItems } from './constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public userMenuItems = UserMenuItems;
  public userMenuVisible = false;

  constructor( ) { }

  ngOnInit(): void { }

}
