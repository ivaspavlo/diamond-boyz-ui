import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreTranslationModule } from '@app/core/core-translation.module';

import { MODULES } from './modules';
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PIPES } from './pipes';


@NgModule({
  declarations: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  imports: [
    ...MODULES,
    CommonModule,
    RouterModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS
  ]
})
export class SharedModule { }
