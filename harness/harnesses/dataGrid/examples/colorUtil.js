let memoize = {};

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export function invertColor(hex) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error(`Invalid HEX color: ${hex}`);
  }

  // invert color components
  let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

export function numberToColor (num, inverse) {
  if (num === undefined) {
    return '#000';
  }

  if (memoize[num.toString() + inverse]) {
    return memoize[num.toString() + inverse];
  }

  if (num === undefined) {
    return '';
  }

  let colorHex = num.toString(16);

  let final;

  if (colorHex.length === 1)      final = `#00000${colorHex}`;
  else if (colorHex.length === 2) final = `#0000${colorHex}`;
  else if (colorHex.length === 3) final = `#000${colorHex}`;
  else if (colorHex.length === 4) final = `#00${colorHex}`;
  else if (colorHex.length === 5) final = `#0${colorHex}`;
  else final =`#${colorHex}`;

  if (inverse) {
    final = invertColor(final);
  }

  return memoize[num.toString() + inverse] = final;
};