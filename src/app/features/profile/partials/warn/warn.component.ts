import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarnComponent implements OnInit {

  @Input() title = '';
  
  public showWarn = true;

  constructor() { }

  ngOnInit(): void { }

  public onCloseWarn(): void {
    this.showWarn = false;
  }

}
