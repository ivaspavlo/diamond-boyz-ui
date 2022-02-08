import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {timer} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyToClipboardComponent {
  @Input() walletAddress: string;

  public showCheckMark = false;

  constructor(private cdr: ChangeDetectorRef) { }

  public onCopyToClipboard(): void {
    this.showCheckMark = true;
    this.cdr.markForCheck();
    timer(2000).pipe(take(1)).subscribe(_ => {
      this.showCheckMark = false;
      this.cdr.detectChanges();
    });
  }

}
