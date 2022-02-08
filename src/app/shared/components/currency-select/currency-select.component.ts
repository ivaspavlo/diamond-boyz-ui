import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CurrencyList } from '@app/features/auction/constants/currency-list.constant';
import { ICurrencyItem } from '@app/interfaces/currency-item.interface';


@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CurrencySelectComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectComponent {

  @Input() items: ICurrencyItem[] = CurrencyList;
  @Input() selectedItem: ICurrencyItem = CurrencyList[0];

  public listItems: ICurrencyItem[] = [];
  public showList = false;

  // ControlValueAccessor
  private onChange: Function;
  private onTouched: Function;

  constructor() { }

  public onToggleList(): void {
    this.showList = !this.showList;
  }

  public onHideList(): void {
    this.showList = false;
  }

  public onSelect(value: ICurrencyItem): void {
    this.selectedItem = value;
    this.listItems = this.getListItems();
    this.onChange(this.selectedItem);
  }

  private getListItems(): ICurrencyItem[] {
    return this.items.filter(i => i.id !== this.selectedItem.id);
  }

  // ControlValueAccessor
  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
  public writeValue(value: ICurrencyItem): void {
    this.selectedItem = value || this.items[0] || null;
    this.listItems = this.getListItems();
  }

}
