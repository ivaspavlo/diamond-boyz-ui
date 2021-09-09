
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogConfig } from '../dialog-config';
import { DialogRef } from '../dialog-ref';
import { InsertionDirective } from '../directives/insertion.directive';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild(InsertionDirective, {read: ViewContainerRef}) insertionPoint: ViewContainerRef;
  public componentRef: ComponentRef<any>

  constructor(
    private dialogConfig: DialogConfig,
    public dialogRef: DialogRef,
    private cdr: ChangeDetectorRef
  ) { }
  
  ngOnInit(): void { }

  ngAfterViewInit() {
    this.loadChildComponent(this.dialogConfig.contentFactory);
    this.cdr.detectChanges();
  }

  public onOverlayClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.clearComponentRef();
    this.dialogRef.close();
  }

  public onDialogClicked(event: MouseEvent): void {
    event.stopPropagation();
  }
  
  private loadChildComponent(factory: any): void {
    this.insertionPoint.clear();
    this.componentRef = this.insertionPoint.createComponent(factory);
  }
  
  private clearComponentRef(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
  
  ngOnDestroy() {
    this.clearComponentRef();
  }

}
