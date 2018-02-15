import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";
import FavCityService from "../service/favcityservice.js";
import CityInputController from "./cityinputcontroller.js";

export default class FavCityController extends AppUiControllerComponent {
  constructor() {
    super();
    this.dependencies = {
      UiControllers: {
        CityInputController: 'CityInputController',
      },
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

  checkCityIsFav(cityFullName) {
    this.dependencies.Services.FavCityService.getItem(cityFullName).then(result => {
      if (result) {
        this.uiElements.addFavCity.classList.add('display-none');
        this.uiElements.removeFavCity.classList.remove('display-none');
      } else {
        this.uiElements.addFavCity.classList.remove('display-none');
        this.uiElements.removeFavCity.classList.add('display-none');
      }
    });
  }

  /* === Private methods === */

  /**
   * Handle add fav city click
   * @param {Event} e
   */
  handleAddFavCity(e) {
    e.preventDefault();
    this.dependencies.Services.FavCityService.addEntry({
      name: this.uiElements.cityFullName.textContent,
    }).then(()=>{
      this.checkCityIsFav(this.uiElements.cityFullName.textContent);
      this.dependencies.UiControllers.CityInputController.focus();
    });
  }

  /**
   * Handle remove fav city click
   * @param {Event} e
   */
  handleRemoveFavCity(e) {
    e.preventDefault();
    this.dependencies.Services.FavCityService.deleteEntry(
      this.uiElements.cityFullName.textContent
    ).then(()=>{
      this.checkCityIsFav(this.uiElements.cityFullName.textContent);
      this.dependencies.UiControllers.CityInputController.focus();
    });
  }
}
