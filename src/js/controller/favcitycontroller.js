import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";
import FavCityService from "../service/favcityservice.js";

export default class FavCityController extends AppUiControllerComponent {
  constructor() {
    super();
    this.dependencies = {
      Services: {
        FavCityService: 'FavCityService',
      },
    };
  }

  /* === Public methods === */

  /**
   * Launches component
   */
  run() {
    this.uiElements.addFavCity.addEventListener('click', this.handleAddFavCity.bind(this));
    this.uiElements.removeFavCity.addEventListener('click', this.handleRemoveFavCity.bind(this));
  }

  /* === Private methods === */

  /**
   * Handle add fav city click
   * @param {Event} e
   */
  handleAddFavCity(e) {
    e.preventDefault();
    this.dependencies.FavCityService.addEntry({
      name: this.uiElements.cityFullName.textContent,
    });
  }

  /**
   * Handle remove fav city click
   * @param {Event} e
   */
  handleRemoveFavCity(e) {
    e.preventDefault();
    this.dependencies.FavCityService.deleteEntry(
      this.uiElements.cityFullName.textContent.toUpperCase()
    );
  }
}
