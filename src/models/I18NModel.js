import {Model} from 'ringa';

import {i18n, i18nHasTokens} from '../utils/i18n';
import {setCookie, getCookie} from '../utils/Cookie';

import moment from 'moment';
import cloner from 'cloner';

export const languagePackDefaults = {
  en: [],
  sv: []
};

/**
 * The I18NModel provides basic, but powerful, internationalization and text replacement support.
 *
 * This class maps a language and a key path to a string value. If the value does not exist, a kind and
 * informative label is displayed indicating which language and which key is missing so that you can quickly
 * spot missing keys in your application while it is running.
 *
 * To use this class, simply do `depend(this, dependency(I18NModel, 'language'))` in your component. Then you
 * can reference a key like so:
 *
 * render() {
 *   const {i18NModel} = this.state;
 *
 *   return <div>{i18NModel.i18n('key.to.value')}</div>;
 * }
 */
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

    return this;
  }

  /**
   * Add a single String value to the language pack at the key specified. Will automatically create the language and a path
   * to the key location if necessary.
   *
   * @param language The language to put this String value into (e.g. 'en' or 'sv')
   * @param keyPath The full path to the store the value within (e.g. 'homePage.mainContent')
   * @param value The actual String value to store at this location.
   */
  addLanguageKey(language, keyPath, value) {
    let obj = this.languagePacks[language];

    if (!obj) {
      obj = this.languagePacks[language] = {};
    }

    let keys = keyPath.split('.');

    while (keys.length > 1) {
      let key = keys.shift();

      obj = obj[key] ? obj[key] : obj[key] = {};
    }

    // Insert our single value into the node (e.g. this.languagePacks['en']['homePage']['mainContent'] = value)
    obj[keys[0]] = value;

    return this;
  }
}
