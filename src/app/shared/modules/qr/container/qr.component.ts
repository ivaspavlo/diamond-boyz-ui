import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrComponent implements OnInit {

  @Input() public qrData: any = 'Your QR code data string';

  constructor() { }

  ngOnInit(): void { }

}
