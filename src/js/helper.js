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
function attachOnClickEvent(htmlElement, eventHandler, scope) {
  htmlElement.onclick = eventHandler.bind(scope);
  htmlElement.ontouchstart = eventHandler.bind(scope);
}

/**
 *
 * @param {object} idSet - A set of keyval pairs <key: HtmlElementId>
 * @param {string[]=} properties - An optional list of properties to include into resulting set
 * @returns {object} - A set of keyval pairs <key: HtmlElement>
 */
function elementIdsToHtmlElements(idSet, properties) {
  if (!properties) {
    properties = Object.keys(idSet);
  }
  return properties.reduce((accumulator, key) => {
    accumulator[key] = document.getElementById(idSet[key]);
    return accumulator;
  },{});
}

/**
 * Removes leading, trailing and double whitespaces
 * @param {string} str - String to sanitize
 * @param {boolean=} [trimTails] - Will trim trailing whitespaces if true
 * @returns {string} - Sanitized string
 */
function sanitizeWhitespaces(str, trimTails) {
  console.log('>' + str.length + ':"' + str.replace(/\s/g,'*') + '"');
  str = str.replace(/\s\s/g,' ');
  str = str.replace(/^\s/,'');
  if (trimTails) str = str.replace(/\s$/,'');
  console.log('<' + str.length + ':"' + str.replace(/\s/g,'*') + '"');
  return str;
}