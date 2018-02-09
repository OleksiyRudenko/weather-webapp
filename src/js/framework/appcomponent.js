/**
 * Class representing application component with default properties.
 * Extended by AppServiceComponent class and AppControllerComponent class.
 */
export default class AppComponent {
  /**
   * AppComponent constructor
   */
  constructor() {
    this.dependencies = {
      Controllers: {},
      Services: {},
    };
    this.config = {};
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
   * Logs class name adding a comment
   * @param comment
   */
  debugThisClassName(comment) {
    console.log(this.__proto__.constructor.name + '::' + comment);
  }

  /**
   * Runs component main job (abstract method, to be overloaded)
   */
  run() {
  }
}
