import NewButtonForm from '../view/new-button-form';
import { render } from '../framework/render.js';

export default class NewButtonPresenter {
  #newButtonContainer = null;
  #boardPresenter = null;
  #destinationModel = null;
  #offerModel = null;

  #newButtonComponent = null;

  constructor({newButtonContainer, boardPresenter, destinationModel, offerModel}) {
    this.#newButtonContainer = newButtonContainer;
    this.#boardPresenter = boardPresenter;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    this.#newButtonComponent = new NewButtonForm();
  }

  renderNewButton = () => {
    render(this.#newButtonComponent, this.#newButtonContainer);
    this.#newButtonComponent.setClickHandler(this.#handleNewButtonClick);
    if (this.#offerModel.offers.length === 0 || this.#destinationModel.destinations.length === 0) {
      this.#newButtonComponent.element.disabled = true;
    }
  };

  #handleNewButtonClick = () => {
    this.#boardPresenter.createPoint(this.#handleNewButtonFormClose);
    this.#newButtonComponent.element.disabled = true;
  }

  #handleNewButtonFormClose = () => {
    this.#newButtonComponent.element.disabled = false;
  };
}
