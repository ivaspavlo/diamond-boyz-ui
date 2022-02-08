import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IButtonTab } from './button-tabs.interface';


@Component({
  selector: 'app-button-tabs',
  templateUrl: './button-tabs.component.html',
  styleUrls: ['./button-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonTabsComponent implements OnInit {

  @Input() tabs: IButtonTab[] = [];
  @Input() currentTab: IButtonTab | null;

  @Output() tabClick: EventEmitter<IButtonTab> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.currentTab = this.currentTab || this.tabs[0] || null;
  }

  public onClick(tab: IButtonTab): void {
    this.currentTab = tab;
    this.tabClick.emit(tab);
  }

}
