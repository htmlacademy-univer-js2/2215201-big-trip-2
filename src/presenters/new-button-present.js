import { render } from '../framework/render.js';
import NewButtonForm from '../view/new-button-form.js';

export default class NewButtonPresent {
  #newButtonContainer = null;
  #newButtonComponent = null;

  #pointModel = null;
  #offerModel = null;
  #boardPresenter = null;
  #destinationModel = null;

  constructor({newPointButtonContainer, destinationsModel, pointsModel, offersModel, boardPresenter}) {
    this.#newButtonContainer = newPointButtonContainer;
    this.#destinationModel = destinationsModel;
    this.#pointModel = pointsModel;
    this.#offerModel = offersModel;
    this.#boardPresenter = boardPresenter;
  }

  init() {
    this.#newButtonComponent = new NewButtonForm();
  }

  renderNewButton = () => {
    render(this.#newButtonComponent, this.#newButtonContainer);
    this.#newButtonComponent.setClickHandler(this.#handleNewButtonClick);
    if (this.#offerModel.offers.length === 0 || this.#offerModel.isSuccessfulLoading === false ||
      this.#destinationModel.destinations.length === 0 || this.#destinationModel.isSuccessfulLoading === false ||
      this.#pointModel.isSuccessfulLoading === false) {
      this.#newButtonComponent.element.disabled = true;
    }
  };

  #handleNewButtonClose = () => {
    this.#newButtonComponent.element.disabled = false;
  };

  #handleNewButtonClick = () => {
    this.#boardPresenter.createPoint(this.#handleNewButtonClose);
    this.#newButtonComponent.element.disabled = true;
  };
}

