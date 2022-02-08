import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxJdenticonModule } from 'ngx-jdenticon';

import { CoreTranslationModule } from '@app/core/core-translation.module';
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PIPES } from './pipes';
import {ClipboardModule} from "@angular/cdk/clipboard";


@NgModule({
  declarations: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreTranslationModule.forChild(),
    NgxJdenticonModule,
    ClipboardModule
  ],
  exports: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS,
  ]
})
export class SharedModule { }
