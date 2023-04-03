import { createElement } from '../render';

const noViewFormTemplateCreation = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point</p>`
);

export default class NoViewForm {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return noViewFormTemplateCreation();
  }

  removeElement() {
    this.#element = null;
  }
}
