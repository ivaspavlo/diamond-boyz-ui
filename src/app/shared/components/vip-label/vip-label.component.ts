import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-vip-label',
  templateUrl: './vip-label.component.html',
  styleUrls: ['./vip-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VipLabelComponent {

  @Input() text: string;

  constructor() { }

}
