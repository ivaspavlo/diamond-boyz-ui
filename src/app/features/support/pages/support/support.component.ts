import { Component, OnInit } from '@angular/core';
import { SocialIcons } from "@app/shared/components/footer/constants";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  public socialIcons = SocialIcons;
  constructor() { }

  ngOnInit(): void {
  }

}
