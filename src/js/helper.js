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
 * @param {string} str
 * @returns {string}
 */
function sanitizeWhitespaces(str) {
  console.log('>' + str.length + ':"' + str + '"');
  str =  str.replace(/\s\s/g,' ').replace(/^\s\s*/,'').replace(/\s\s*$/,'');
  console.log('<' + str.length + ':"' + str + '"');
  return str;
}