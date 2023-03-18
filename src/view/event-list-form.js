import {createElement} from '../render';

const eventListFormTemplateCreation = () => (
  `
    <ul class="trip-events__list">
    </ul>
  `
);

export default class EventListForm {
  #element = null;

  get template () { return eventListFormTemplateCreation(); }

  get element() {
    if (!this.#element) { this.#element = createElement(this.template); }
    return this.#element;
  }

  removeElement() { this.#element = null; }
}
