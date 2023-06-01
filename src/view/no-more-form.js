import AbstractView from '../framework/view/abstract-view.js';

const templateNoMoreFormCreation = () => (
  `<p class="trip-events__msg">
    There is no any data...
    </p>`);
export default class NoMoreForm extends AbstractView {
  get template() {
    return templateNoMoreFormCreation();
  }
}
