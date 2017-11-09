import {Model} from 'ringa';

import {i18n, i18nHasTokens} from '../utils/i18n';
import {setCookie, getCookie} from '../utils/Cookie';

import moment from 'moment';
import cloner from 'cloner';

export const languagePackDefaults = {
  en: [],
  sv: []
};

export default class I18NModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, defaultLanguage) {
    super(name);

    this.cache = {};

    if (defaultLanguage === undefined) {
      defaultLanguage = getCookie('lang');

      if (!defaultLanguage) {
        defaultLanguage = 'en';
      }
    }

    this.addProperty('language', defaultLanguage, {
      onChange: () => {
        moment.locale(this.language);

        setCookie('lang', this.language);
      }
    });

    this.addProperty('languagePacks', {});

    this.i18n = this.i18n.bind(this);

    // Setup default language packs
    for (let lang in languagePackDefaults) {
      let languagePacks = languagePackDefaults[lang];

      languagePacks.forEach(languagePack => {
        this.mergeLanguagePack(lang, languagePack);
      });
    }
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get languageKeys() {
    return Object.keys(this.languagePacks);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  /**
   * The i18n function maps a i18n key and options to a response value, allowing the use of any i18n
   * framework.
   */
  i18n(key, options) {
    let cacheKey = this.language + key;

    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    let o = Object.assign({
      language: this.language,
      languagePack: this.languagePacks[this.language]
    }, options);

    let result = i18n(key, o);

    if (result.charAt(0) !== '[' && !i18nHasTokens(key, o)) {
      this.cache[cacheKey] = result;
    }

    return result;
  }

  /**
   * Merges a language pack Object (just a generic JS Object with keys for language items) into
   * the currently loaded Object for that language. Note that the merged item overwrites any
   * currently existing items.
   *
   * @param language The language to merge into (e.g. 'en' or 'se') ISO 3166-1-alpha-2 code
   * @param pack A generic JS object of any depth where dot-delimited keys are mapped to phrases.
   */
  mergeLanguagePack(language, pack) {
    this.languagePacks[language] = this.languagePacks[language] ? cloner.deep.merge(pack, this.languagePacks[language]) : pack;

    // Go ahead and let any watchers know
    this.notify('languagePacks');
  }
}
