import AppUiControllerComponent from "../framework/appuicontrollercomponent.js";
import CityHistoryService from "../service/cityhistoryservice.js";
import CityInputController from "./cityinputcontroller.js";
import FavCityService from "../service/favcityservice.js";

/** Class representing search history service. */
export default class SearchHistoryController extends AppUiControllerComponent {
  /**
   * Create city browse history controller.
   * @constructor
   */
  constructor() {
    super();
    this.config = {};
    this.dependencies = {
      Services: {
        CityHistoryService: 'CityHistoryService',
        FavCityService: 'FavCityService',
      },
      UiControllers: {
        CityInputController: 'CityInputController',
      },
    };
    this.uiElements.firstListItem = null;
    this._isActive = false;
  }

  /* === Public methods === */

  /**
   * Component initial activities
   */
  run() {
    super.run();
    // this.debugThisClassName('run');
    this.attachOnClickHandler(this.uiElements.container, this.onClick);
  }

  /**
   * Shows search history list
   */
  show() {
    return Promise.all([this.getFavourites(),this.getHistory()]).then(lists => {
      this.uiElements.container.innerHTML = '';

      const icons = ['star', 'history'];
      // populate joint list with unique values
      let superList = [];
      lists.forEach((list, listIndex) => {
        list.forEach((entry) => {
          const any = superList.find(el => el.value === entry);
          if (!any) superList.push({value: entry, icon: icons[listIndex]});
        });
      });

      // build HTML elements
      superList.forEach((item, index) => {
        this.uiElements.container.appendChild(this.renderEntry(index, item.value, item.icon));
      });
      this.uiElements.container.classList.add('city-container-visible');
      this.uiElements.firstListItem = document.getElementById('city-list-element-0');
      return true;
    });
  }

  /**
   * Hides search history list
   */
  hide() {
    this._isActive = false;
    this.uiElements.container.classList.remove('city-container-visible');
  }

  /**
   * Focuses on first list element if any
   */
  focus() {
    this.debugThisClassName('focus');
    // console.log(this.uiElements.firstListItem);
    this.uiElements.firstListItem.focus();
  }

  /* === Private methods : MAIN JOBS === */

  /**
   * Handles item click
   * @param {Event} e
   */
  onClick(e) {
    const target = e.target;
    // this.debugThisClassName('onClick');
    // console.log(e.target);
    // console.log(e);
    const cityName = (e.clientX && e.clientY) ? e.target.getAttribute('data-value') : e.target.value;
    // console.log('Clicked on ' + cityName);
    // console.log(e);

    // Hide list
    this._isActive = false;
    if (e.clientX && e.clientY) {
      e.preventDefault();
      this.uiElements.container.classList.remove('city-container-visible');
      this.dependencies.UiControllers.CityInputController.setValue(cityName);
    }
  }

  renderEntry(index, value, icon='') {
    const mainRadioInput = document.createElement('input');
    mainRadioInput.id = 'city-list-element-' + index;
    mainRadioInput.setAttribute('type', 'radio');
    mainRadioInput.setAttribute('name', 'city-list');
    mainRadioInput.setAttribute('value', value);
    mainRadioInput.classList.add('city-list-radio');
    if (!index) mainRadioInput.setAttribute('checked', '');
    mainRadioInput.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 13:
          e.preventDefault();
          this.uiElements.container.classList.remove('city-container-visible');
          this.dependencies.UiControllers.CityInputController.setValue(e.target.value);
          break;
        case 27:
          this.hide();
          this.dependencies.UiControllers.CityInputController.focus();
          break;
      }
    });

    let mainContentIcon = null;
    if (icon) {
      mainContentIcon = document.createElement('i');
      mainContentIcon.classList.add('material-icons');
      const mainContentIconAttr = document.createAttribute('data-value');
      mainContentIconAttr.value = value;
      mainContentIcon.setAttributeNode(mainContentIconAttr);
      mainContentIcon.innerHTML = icon;
    }

    const mainContentText = document.createTextNode(value);

    const mainContent = document.createElement('div');
    mainContent.classList.add('city-list-element');
    const mainContentAttr = document.createAttribute('data-value');
    mainContentAttr.value = value;
    mainContent.setAttributeNode(mainContentAttr);
    mainContent.setAttribute('data-value', value);
    mainContentIcon && mainContent.appendChild(mainContentIcon);
    mainContent.appendChild(mainContentText);
    mainContent.addEventListener('hover', (e) => {
      console.log('HOVER on');
      console.log(e);
      console.log(e.target);

      /* console.log('hover');
      console.log(mainRadioInput);
      mainRadioInput.focus(); */
    });

    const label = document.createElement('label');
    label.setAttribute('for', 'city-list-element-' + index);

    label.appendChild(mainRadioInput);
    label.appendChild(mainContent);

    const container = document.createElement('div');
    container.appendChild(label);

    // this.debugThisClassName('renderEntry');
    // console.log(container);

    return container;
  }

  getFavourites() {
    return this.dependencies.Services.FavCityService.getItems();
  }

  getHistory() {
    return this.dependencies.Services.CityHistoryService.getItems();
  }
}
