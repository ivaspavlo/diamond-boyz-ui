import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() routerLinks: any[] = [];
  @Input() parentTitle: string;
  @Input() title: string |unknown = '';
  constructor() { }

  ngOnInit(): void {
  }

}
