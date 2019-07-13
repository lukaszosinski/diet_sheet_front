import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitializeService {

  constructor(private translateService: TranslateService) { }

  initialize(): void {
    this.initializeTranslateService(this.getTranslateServiceConfig());
  }

  private getTranslateServiceConfig(): TranslateServiceInitializationConfig {
    const browserLang = this.translateService.getBrowserLang();
    const defaultLanguage = Language.PL;
    const supportedLanguages: Language[] = Object.values(Language);
    const initialLanguage: Language = supportedLanguages.includes(browserLang as Language) ? browserLang as Language : defaultLanguage;
    return { defaultLanguage, supportedLanguages, initialLanguage };
  }

  initializeTranslateService(config: TranslateServiceInitializationConfig) {
    this.translateService.addLangs(config.supportedLanguages);
    this.translateService.setDefaultLang(config.defaultLanguage);
    this.translateService.use(config.initialLanguage);
  }
}

export interface TranslateServiceInitializationConfig {
  initialLanguage: Language;
  supportedLanguages: Language[];
  defaultLanguage: Language;
}

export enum Language {
  PL = 'pl',
}
