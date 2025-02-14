import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { settingsLanguageKey } from '../../../constants';
import translationsEN from "../../../../public/i18n/en.json";
import translationsFR from "../../../../public/i18n/fr.json";

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {

  readonly availableLanguages: Array<string> = ['en', 'fr'];

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) { }

  initialize() {
    // We use the language set in the local storage if exists
    let languageName: string | undefined = this.localStorageService.getItem(settingsLanguageKey) || '';

    if (!languageName) {
      // If not, we use the language set in the browser settings if it belongs to availableLanguages .
      // Otherwise, we use the first language in availableLanguages (en)
      const languageCode = navigator.language.substring(0, 2).toLowerCase();
      languageName = this.availableLanguages.find((language) => language === languageCode) || this.availableLanguages[0];
    }
    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang(this.availableLanguages[0]);
    this.use(languageName);
    this.translateService.setTranslation(this.availableLanguages[0], translationsEN);
    this.translateService.setTranslation(this.availableLanguages[1], translationsFR);
  }

  use(language: string) {
    this.localStorageService.setItem(settingsLanguageKey, language);
    this.translateService.use(language);
  }

  getCurrentLanguage(): string {
    const localStorageLang = this.localStorageService.getItem(settingsLanguageKey);
    let currentLang = this.availableLanguages.find((language) => language === localStorageLang);

    if (!currentLang) {
      currentLang = this.availableLanguages.find((language) => language === this.translateService.defaultLang) || this.availableLanguages[0];
    }

    return currentLang;
  }

}
