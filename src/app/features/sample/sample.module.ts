import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleRoutingModule } from './sample-routing.module';

import { PAGES } from '../auth/pages';
import { PARTIALS } from './partials';
import { PIPES } from './pipes';
import { DIRECTIVES } from './directives';


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS,
    ...PIPES,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    SampleRoutingModule
  ]
})
export class SampleModule { }
