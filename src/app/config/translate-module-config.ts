import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

export class DietMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    const missingTranslationKey = 'ERROR.MISSING_TRANSLATION';
    if (params.translateService.currentLang) {
      return params.translateService.instant(missingTranslationKey, { missingKey: params.key });
    }
    return `Missing translation: '${params.key}'`;
  }
}

export const translateModuleConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [ HttpClient ]
  },
  missingTranslationHandler: { provide: MissingTranslationHandler, useClass: DietMissingTranslationHandler },
};
