/**
 * Class representing application component with default properties.
 * Extended by AppServiceComponent class and AppControllerComponent class.
 */
export default class AppComponent {
  /**
   * AppComponent constructor
   * @constructor
   */
  constructor() {
    this.config = {
      // configTopLevelKey: 'configTopLevelKey' <= global config.config{}
    };
    this.dependencies = { // ComponentName: 'ComponentName'
      Services: {},
      Controllers: {},
      UiControllers: {},
    };
    // this.debugThisClassName('constructor');
  }

  /* === Public methods === */

  /**
   * Component initial activities after boostrapping (abstract method, to be overloaded)
   * Root activities, e.g. creating database or pick initial data, before other components get activated
   */
  runRoot() {
    // this.debugThisClassName('RUN-ROOT');
  }

  /**
   * Component initial activities after boostrapping (abstract method, to be overloaded)
   */
  run() {
    // this.debugThisClassName('RUN');
  }

  /* === Private methods : SECONDARY === */

  /**
   * Returns component config
   * @returns {Object}
   */
  getConfig() {
    return this.config;
  }

  /**
   * Sets component config
   * @param config
   */
  setConfig(config) {
    this.config = config;
  }

  /**
   * Returns component dependencies container
   * @returns {Object}
   */
  getDependencies() {
    return this.dependencies;
  }

  /**
   * Sets component dependencies container
   * @param dependencies
   */
  setDependencies(dependencies) {
    this.dependencies = dependencies;
  }

  /**
   * Logs class name adding a comment
   * @param comment
   */
  debugThisClassName(comment) {
    console.log(this.__proto__.constructor.name + '::' + comment);
  }
}
