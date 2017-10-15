export function setCookie(name, value, daysUntilExpiration) {
  let d = new Date();
  d.setTime(d.getTime() + (daysUntilExpiration * 24 * 60 * 60 * 1000));

  let expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires};path=/`;
}

export function getCookie(name) {
  name = name + '=';

  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export default {
  setCookie,
  getCookie,
  deleteCookie
}