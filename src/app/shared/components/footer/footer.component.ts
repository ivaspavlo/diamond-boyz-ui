import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FooterMenuItems, SocialIcons } from './constants';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  public footerMenuItems = FooterMenuItems;
  public socialIcons = SocialIcons;

  constructor() { }

  ngOnInit(): void { }

}
