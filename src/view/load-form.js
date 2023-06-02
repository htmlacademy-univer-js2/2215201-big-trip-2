import AbstractView from '../framework/view/abstract-view.js';

const templateLoadingCreation = () => (
  `<p class="trip-events__msg">
        Loading...
  </p>`
);

export default class LoadForm extends AbstractView {
  get template() {
    return templateLoadingCreation();
  }
}

