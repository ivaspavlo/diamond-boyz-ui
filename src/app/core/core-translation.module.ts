import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


// Required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export const TranslateConfig = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
}

@NgModule()
export class CoreTranslationModule {

  static forRoot(): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot(TranslateConfig);
  }

  static forChild(): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forChild(TranslateConfig);
  }

}
