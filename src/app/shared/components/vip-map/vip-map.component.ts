import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vip-map',
  templateUrl: './vip-map.component.html',
  styleUrls: ['./vip-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VipMapComponent {
  constructor() { }
}
