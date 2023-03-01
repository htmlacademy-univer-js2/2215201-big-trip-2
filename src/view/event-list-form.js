import {createElement} from '../render';

const eventListFormTemplateCreation = () => (
  `
    <ul class="trip-events__list">
    </ul>
  `
);

class EventListForm {
  getTemplate () { return eventListFormTemplateCreation(); }

  getElement() {
    if (!this.element) { this.element = createElement(this.getTemplate()); }
    return this.element;
  }

  removeElement() { this.element = null; }
}

export default { EventListForm };
