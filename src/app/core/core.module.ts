import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@app/shared/shared.module';

import { CoreRoutingModule } from './core-routing.module';

import { PROVIDERS } from './providers';
import { INTERCEPTORS } from './interceptors';
import { PAGES } from './pages';


@NgModule({
  declarations: [
    ...PAGES
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreRoutingModule,
    SharedModule
  ],
  providers: [
    ...PROVIDERS,
    ...INTERCEPTORS
  ],
  exports: [
    CoreRoutingModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import available only in AppModule');
    }
  }
}
