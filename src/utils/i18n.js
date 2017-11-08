import showdown from 'showdown';
let converter = new showdown.Converter();

const getDeepKey = function(key, obj) {
  let ix = key.indexOf('.');

  return ix !== -1 ? getDeepKey(key.substr(ix + 1), obj[key.substr(0, ix)]) : obj[key];
};

const replaceKeys = function (str, values) {
  let arr;
  let newStr = str;
  let re = /\${[a-zA-Z0-9_]+}/g;

  while ((arr = re.exec(str)) !== null) {
    let varName = str.substr(arr.index + 2, arr[0].length - 3);

    newStr = newStr.replace(arr[0], values[varName]);
  }

  return newStr;
};

export function i18nHasTokens(key, options) {
  let item = getDeepKey(key, options.languagePack);

  return item && item.search(/\${/) !== -1;
};

export function i18n(key, options) {
  try {
    let item = getDeepKey(key, options.languagePack);

    if (item.search(/\${/) !== -1) {
      item = replaceKeys(item, options);
    }

    if (item.startsWith('markdown:')) {
      item = item.substring(9);

      item = item.replace('\\n', '\n');

      item = converter.makeHtml(item);
    }

    return item || `['${options.language}' key '${key}']`;
  } catch (error) {
    return `['${options.language}' key '${key}']`;
  }
};