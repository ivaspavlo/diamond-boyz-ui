import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropDownSizes, DropDownTypes, IDropDownItem } from './interfaces';


class DropDownItem implements IDropDownItem {
  public value: any;
  public name: string;
  public checked?: boolean;
  public extra?: string;

  constructor(item: any) {
    this.value = typeof item === 'object' ? item?.value : item;
    this.name = typeof item === 'object' ? item?.name : item;
    this.checked = item?.checked;
    this.extra = item?.extra;
  }
}

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropDownComponent,
    multi: true
  }]
})
export class DropDownComponent implements OnInit {

  @ViewChild('trigger', { static: true }) trigger: ElementRef;
  @ViewChild('listOverlay', { static: true }) listOverlay: ElementRef;
  @ViewChild('list', { static: true }) list: ElementRef;

  @Input() items: any[] = [];
  @Input() current: any = null;
  @Input() title: string = '';

  @Input() disabled = false;
  @Input() type: DropDownTypes = 'single';
  @Input() size: DropDownSizes = 'md';

  public showList = false;
  public listStyle = {};
  public innerItems: IDropDownItem[] = [];
  public innerControl: FormArray;

  private itemHeightPx = 48;
  private get isMultiType(): boolean { return this.type === 'multi'; }

  // ControlValueAccessor
  private onChange: Function;
  private onTouched: Function;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.innerItems = this.items.map((item: any) => new DropDownItem(item));
    this.initInnerControl();
    this.current = this.current || this.items ? this.items[0] : null;
    this.title = this.title || this.current?.name || null;
  }


  // ControlValueAccessor

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
  public writeValue(value: any): void {
    // TODO: implement init value logic
  }


  // Public methods

  public onShowList(): void {
    this.showList = !this.showList;
    if (this.showList) {
      this.calcListPosition();
      this.showListOverlay();
    }
  }

  public onHideList(): void {
    this.showList = !this.showList;
    this.removeListOverlay();
  }

  public onListItemClick(event: MouseEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();

    this.current = this.items[index];

    if (this.isMultiType) {
      this.innerControl.controls[index].patchValue(this.current.checked);
    } else {
      this.title = this.current.name;
      this.onChange(this.current.value);
      this.onHideList();
    }
  }


  // Private methods

  private showListOverlay(): void {
    this.renderer.setStyle(this.listOverlay.nativeElement, 'display', 'flex');
    this.document.body.appendChild(this.listOverlay.nativeElement);
  }

  private removeListOverlay(): void {
    this.renderer.setStyle(this.listOverlay.nativeElement, 'display', 'none');
    this.document.body.removeChild(this.listOverlay.nativeElement);
  }

  private px(qty: number): string {
    return `${qty}px`;
  }
  
  private calcListPosition(): void {
    const documentHeight = this.document.body.offsetHeight;
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const { bottom, top, left, right, width } = this.trigger.nativeElement.getBoundingClientRect();
    const fullListHeight = this.itemHeightPx * this.innerItems.length;

    const showAbove = documentHeight - bottom < this.itemHeightPx;

    const biggerThanView = showAbove ?
      top - fullListHeight < 0:
      bottom + fullListHeight > documentHeight;

    if (showAbove) {
      this.listStyle = {
        bottom: this.px(documentHeight - bottom),
        left: this.px(left),
        width: this.px(width),
        minHeight: biggerThanView ? this.px(top) : this.px(fullListHeight),
      }
    } else {
      this.listStyle = {
        top: this.px(bottom + currentScroll),
        left: this.px(left),
        width: this.px(width),
        minHeight: biggerThanView ? this.px(documentHeight - bottom) : this.px(fullListHeight)
      }
    }
  }
  
  private initInnerControl(): void {
    this.innerControl = new FormArray([
      ...this.innerItems.map((item: any) => new FormControl(item?.checked))
    ]);
  }

}
