import * as EN_ALL from './assets/i18n/en/index';
import * as SV_ALL from './assets/i18n/sv/index';

const EN = 'en';
const SV = 'sv';

/**
 * The primary I18NModel instance is created in DefaultApplicationRoot. ApplicationLayout extends this and then
 * calls our setup function below. Here we add all our keys to the language pack before the application is rendered
 * so that we can then display the values immediately.
 *
 * Note: in this template we are loading all of our language data directly into our final JS artifact. For large
 * applications this is a poor strategy since we would probably want to dynamically load our language data from a DB
 * or a file stored on the server.
 */
export function setup(i18NModel) {
  // Language packs are a JSON file of multiple keys
  i18NModel.mergeLanguagePack(EN, EN_ALL.LANGUAGE_PACK);
  i18NModel.mergeLanguagePack(SV, SV_ALL.LANGUAGE_PACK);

  // addLanguageKey adds a single key at a time. This is useful if our content for the page is larger
  // than we would want in a single key in a JSON file.
  i18NModel.addLanguageKey(EN, 'i18n.description', EN_ALL.I18N);
  i18NModel.addLanguageKey(SV, 'i18n.description', SV_ALL.I18N);

  i18NModel.addLanguageKey(EN, 'screen.description', EN_ALL.SCREEN);
  i18NModel.addLanguageKey(EN, 'debugInspector.description', EN_ALL.DEBUG_INSPECTOR);
  i18NModel.addLanguageKey(EN, 'theme.description', EN_ALL.THEME);
  i18NModel.addLanguageKey(EN, 'dataGrid.description', EN_ALL.DATA_GRID);
  i18NModel.addLanguageKey(EN, 'alert.description', EN_ALL.ALERT);
  i18NModel.addLanguageKey(EN, 'modal.description', EN_ALL.MODAL);

  // By default the language is loaded from a cookie 'lang' on the local domain, but you could set it up to something else
  // here
  // i18NModel.language = EN;
}