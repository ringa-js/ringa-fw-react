window.getBoundingClientRect = function () {
  return {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight
  }
};

export function makeGlobalStyleRelativeTo(style, el) {
  let bounds = getBounds(el);

  style.left -= bounds.left;
  style.top -= bounds.top;

  return style;
}

export function hasAncestorWithClass(el, className) {
  while (el) {
    if (el.className && typeof el.className === 'string' && el.className.split(' ').indexOf(className) !== -1) {
      return true;
    }

    el = el.parentNode;
  }

  return false;
}

export function hasAncestorWithId(el, id) {
  while (el) {
    if (el.id === id) {
      return true;
    }

    el = el.parentNode;
  }

  return false;
}

export function hasAncestor(el, el2) {
  while (el) {
    if (el === el2) {
      return true;
    }

    el = el.parentNode;
  }

  return false;
}

/**
 * This function takes in styling information like left, top, right, and bottom and returns new
 * styling information that makes sure the item remains on the screen.
 *
 * @param style
 */
export function forceInWindow(style, el) {
  let newStyle = Object.assign({}, style);
  let w = newStyle.width;
  let h = newStyle.height;

  if (el) {
    let size = getSize(el);
    w = size.width;
    h = size.height;
  }

  if (newStyle.left < 0) {
    newStyle.left = 0;
  }
  if (newStyle.top < 0) {
    newStyle.top = 0;
  }
  if (newStyle.left + w > window.innerWidth) {
    newStyle.left = window.innerWidth - w;
  }
  if (newStyle.top + h > window.innerHeight) {
    newStyle.top = window.innerHeight - h;
  }

  return newStyle;
}

export function isStyleInWindow({left, top, width, height}) {
  return left >= 0 && top >= 0 &&
    (left + width <= window.innerWidth) &&
    (top + height <= window.innerHeight);
}

export function isInWindow(el) {
  const elBounds = getBounds(el);

  return elBounds.left >= 0 && elBounds.top >= 0 &&
    (elBounds.left + elBounds.width <= window.innerWidth) &&
    (elBounds.top + elBounds.height <= window.innerHeight);
}

/**
 * Returns false if any part of el1 is outside of el2
 * @param el1 The testing element
 * @param el2 The containing element
 * @returns {*} True if all of el1 is inside of el2
 */
export function isWithin(el1, el2, {leftOffset = 0, rightOffset = 0, topOffset = 0, bottomOffset = 0}) {
  const el1Bounds = getBounds(el1);
  const el2Bounds = getBounds(el2);

  return el1Bounds.left >= el2Bounds.left - leftOffset && el1Bounds.top >= el2Bounds.top - topOffset &&
    (el1Bounds.left + el1Bounds.width <= el2Bounds.left + el2Bounds.width + rightOffset) &&
    (el1Bounds.top + el1Bounds.height <= el2Bounds.top + el2Bounds.height + bottomOffset);
}

/**
 * Returns true if the coordinates are within the element.
 *
 * @param el The testing element
 * @param x X Coordinate
 * @param y Y Coordinate
 * @returns {*} True if x,y is within el
 */
export function isCoordWithin(el, x, y) {
  const elBounds = getBounds(el);

  return x >= elBounds.left && y >= elBounds.top &&
    (x <= elBounds.left + elBounds.width) &&
    (y <= elBounds.top + elBounds.height);
}

/**
 * Returns true if any part of el1 is above el2 (y coordinates)
 * @param el1 The testing element
 * @param el2 The containing element
 * @returns {*} True if all of el1 is inside of el2
 */
export function isAbove(el1, el2, verticalOffset = 0) {
  const el1Bounds = getBounds(el1);
  const el2Bounds = getBounds(el2);

  return el1Bounds.top < (el2Bounds.top + verticalOffset);
}

//http://stackoverflow.com/questions/28966678/getboundingclientrect-returning-wrong-results
export function getBoundingClientRect(el) {
  if (!el) {
    return undefined;
  }

  return el.getBoundingClientRect();
}

export function getInnerSize(el) {
  if (!el) {
    return undefined;
  }

  let style = window.getComputedStyle(el, null);

  return {
    width: style.getPropertyValue('width'),
    height: style.getPropertyValue('height')
  };
}

export function getSize( el ) {
  if (!el) {
    return undefined;
  }

  return { width: el.offsetWidth, height: el.offsetHeight };
}

export function getBounds( el ) {
  return getBoundingClientRect(el);//Object.assign({}, getSize(el), getBoundingClientRect(el));
}

export function isOver(mouseEvent, el) {
  const offX = mouseEvent.nativeEvent ? mouseEvent.nativeEvent.clientX : mouseEvent.clientX;
  const offY = mouseEvent.nativeEvent ? mouseEvent.nativeEvent.clientY : mouseEvent.clientY;

  const offset = getBoundingClientRect(el);
  const size = getSize(el);

  return offX > offset.left && offY > offset.top && offX < (offset.left + size.width) && offY < (offset.top + size.height);
}

export function adjustBy (style, align, relativeBounds, invert = false) {
  if (!align) {
    return;
  }

  switch (align) {
    case 'left':
      break;
    case 'right':
      if (invert) {
        style.left -= relativeBounds.width;
      } else {
        style.left += relativeBounds.width;
      }
      break;
    case 'top':
      break;
    case 'bottom':
      if (invert) {
        style.top -= relativeBounds.height;
      } else {
        style.top += relativeBounds.height;
      }
      break;
    case 'horizontal-middle':
      if (invert) {
        style.left -= relativeBounds.width / 2;
      } else {
        style.left += relativeBounds.width / 2;
      }
      break;
    case 'vertical-middle':
      if (invert) {
        style.top -= relativeBounds.height / 2;
      } else {
        style.top += relativeBounds.height / 2;
      }
      break;
  }

  return style;
}

/**
 * Calculates the style (left, top, etc.) of `domNode` so that is positioned relative to `relativeDOMNodee` in the viewport.
 *
 * @param domNode The DOM Node to position
 * @param relativeDOMNodee The DOM Node against which we position ourselves relatively.
 * @param position 'top', 'bottom', 'left', or 'right'
 * @param positionAlternate Used when the target would be off screen. Can be 'top', 'bottom', 'left', or 'right'
 * @param offset {x, y} coordinate to adjust the final style relative to its position BEFORE adjusting if it is offscreen.
 * @returns {{position: string}}
 */
export function calcRelativeViewportPosition(domNode, relativeDOMNode, {position, align, shift, positionAlternate, alignAlternate, shiftAlternate, offset = {x: 0, y: 0}, offsetAlternate = {x: 0, y: 0}, forceInViewport = true}) {
  let style = {
    position: 'absolute'
  };

  let options = {
    alternate: false
  };

  let relativeDOMNodeBounds = getBounds(relativeDOMNode);
  let domNodeBounds = getBounds(domNode);

  let calcLeftAndTop = (style, position, align, shift, offset) => {
    switch (position) {
      case 'bottom':
        style.left = relativeDOMNodeBounds.left;
        style.top = relativeDOMNodeBounds.top + relativeDOMNodeBounds.height;
        break;
      case 'top':
        style.left = relativeDOMNodeBounds.left;
        style.top = relativeDOMNodeBounds.top - domNodeBounds.height;
        break;
      case 'left':
        style.left = relativeDOMNodeBounds.left - domNodeBounds.width;
        style.top = relativeDOMNodeBounds.top;
        break;
      case 'right':
        style.left = relativeDOMNodeBounds.left + relativeDOMNodeBounds.width;
        style.top = relativeDOMNodeBounds.top;
    }

    adjustBy(style, align, relativeDOMNodeBounds);

    if (shift) {
      let shifts = shift.split(' ');

      shifts.forEach(shift => {
        adjustBy(style, shift, domNodeBounds, true);
      });
    }

    style.left += offset.x;
    style.top += offset.y;

    return style;
  };

  // Calculate our default style relative to our target dom node.
  style = calcLeftAndTop(style, position, align, shift, offset);

  // If asked, we check if the dom node is still in the window
  if (forceInViewport) {
    // If it isn't in the window...
    if (!isStyleInWindow({left: style.left, top: style.top, width: domNodeBounds.width, height: domNodeBounds.height})) {
      // If there is an alternate position provided, we just do that
      // (e.g. a dropdown will open 'top' (up) instead of 'bottom' (down))
      if (positionAlternate) {
        style = calcLeftAndTop(style, positionAlternate, alignAlternate, shiftAlternate, offsetAlternate);
        options.alternate = positionAlternate;
      } else {
        // Otherwise, just mash the item into the window the closest way we can
        style = forceInWindow(style, domNode, relativeDOMNodeBounds);
      }
    }
  }

  return {
    style,
    options
  };
}