import AbstractView from '../framework/view/abstract-view.js';

const newButtonTemplateCreation = () =>
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">' +
    'New event' +
  '</button>';

export default class NewButtonForm extends AbstractView {

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  get template() {
    return newButtonTemplateCreation();
  }
}
