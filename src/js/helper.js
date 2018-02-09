/*  Function to test if an object is a plain object, i.e. is constructed
**  by the built-in Object constructor and inherits directly from Object.prototype
**  or null. Some built-in objects pass the test, e.g. Math which is a plain object
**  and some host or exotic objects may pass also.
**
**  @param {} obj - value to test
**  @returns {Boolean} true if passes tests, false otherwise
**  Source: https://stackoverflow.com/questions/5876332/how-can-i-differentiate-between-an-object-literal-other-javascript-objects
*/
export const isPlainObject = (obj) => {
  // Basic check for Type object that's not null
  if (typeof obj === 'object' && obj !== null) {
    // If Object.getPrototypeOf supported, use it
    if (typeof Object.getPrototypeOf === 'function') {
      const proto = Object.getPrototypeOf(obj);
      return proto === Object.prototype || proto === null;
    }
    // Otherwise, use internal class
    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  // Not an object
  return false;
};

/**
 * @callback EventCallback
 * @param {event} e - event data
 */

/**
 * Attach mouse-click and touch event handlers to an HTML Element.
 * @param {Element} htmlElement - The HTML Element to attach event handler to
 * @param {EventCallback} eventHandler - The callback that handles the response
 * @param {object} scope - scope to bind the callback to
 */
export const attachOnClickEvent = (htmlElement, eventHandler, scope) => {
  htmlElement.onclick = eventHandler.bind(scope);
  htmlElement.ontouchstart = eventHandler.bind(scope);
};

/**
 *
 * @param {object} idSet - A set of keyval pairs <key: HtmlElementId>
 * @param {string[]=} properties - An optional list of properties to include into resulting set
 * @returns {object} - A set of keyval pairs <key: HtmlElement>
 */
export const elementIdsToHtmlElements = (idSet, properties) => {
  if (!properties) {
    properties = Object.keys(idSet);
  }
  return properties.reduce((accumulator, key) => {
    accumulator[key] = document.getElementById(idSet[key]);
    return accumulator;
  },{});
};

/**
 * Builds associative object where keys refer to HTML Elements.
 * @param {object} srcObject - Keys are HTML elements major part of element id
 * @param {string=} idPrefix - An optional prefix added to element key to get complete element id
 * @param {string[]=} keys - An optional list of properties to include into resulting set
 * @returns {object} - A set of keyval pairs <key: HtmlElement>
 */
export const objectKeysToHtmlElements = (srcObject, idPrefix='', keys=null) => {
  if (!keys) {
    keys = Object.keys(srcObject);
  }

  return keys.reduce((accumulator, key) => {
    const elRef = document.getElementById(idPrefix + key);
    if (elRef) accumulator[key] = elRef;
    return accumulator;
  },{});
};

/**
 * Removes leading, trailing and double whitespaces
 * @param {string} str - String to sanitize
 * @param {boolean=} [trimTails] - Will trim trailing whitespaces if true
 * @returns {string} - Sanitized string
 */
export const sanitizeWhitespaces = (str, trimTails) => {
  // DEBUG: console.log('>' + str.length + ':"' + str.replace(/\s/g,'*') + '"');
  str = str.replace(/\s\s+/g,' ');
  str = str.replace(/^\s/,'');
  if (trimTails) str = str.replace(/\s$/,'');
  // DEBUG: console.log('<' + str.length + ':"' + str.replace(/\s/g,'*') + '"');
  return str;
};

/**
 * Detect caret position
 * Source: https://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
 * @param {Element} htmlElement - Input text HTML element
 * @returns {number} - caret position
 */
export const getCaretPosition = (htmlElement) => {
  // Initialize
  let iCaretPos = 0;

  // IE Support
  if (document.selection) {
    // Set focus on the element
    oField.focus();

    // To get cursor position, get empty selection range
    const oSel = document.selection.createRange();

    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }

  // Firefox support
  else if (htmlElement.selectionStart || htmlElement.selectionStart == '0')
    iCaretPos = htmlElement.selectionDirection === 'backward' ? htmlElement.selectionStart : htmlElement.selectionEnd;

  // Return results
  return iCaretPos;
};

/**
 * Sets caret position
 * source: https://stackoverflow.com/questions/512528/set-keyboard-caret-position-in-html-textbox
 * @param {Element} htmlElement - Input text HTML element
 * @param {number} caretPos - Position to place caret at
 */
export const setCaretPosition = (htmlElement, caretPos) => {
  if(htmlElement) {
    if(htmlElement.createTextRange) {
      const range = htmlElement.createTextRange();
      range.move('character', caretPos);
      range.select();
    }
    else {
      if(htmlElement.selectionStart) {
        htmlElement.focus();
        htmlElement.setSelectionRange(caretPos, caretPos);
      }
      else
        htmlElement.focus();
    }
  }
};

/**
 * Takes an object, traverses it, applies a callback to each non-plain-object value.
 * Nested plain objects also get traversed.
 * @param {Object} source
 * @param {Function} callback(primitiveValue, key)
 * @returns {Object} amended source
 */
export const traverseObjectAndChange = (source, callback) => {
  const dest = {};
  Object.keys(source).forEach((key, idx) => {
    if (isPlainObject(source[key])) {
      dest[key] = traverseObjectAndChange(source[key],callback);
    } else {
      dest[key] = callback(source[key], key);
    }
  });
  return dest;
};
