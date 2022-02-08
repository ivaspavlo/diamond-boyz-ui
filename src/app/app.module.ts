import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CoreTranslationModule } from './core/core-translation.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    CoreTranslationModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {closeOnNavigation: true}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
