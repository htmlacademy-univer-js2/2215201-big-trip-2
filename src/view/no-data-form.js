import AbstractView from '../framework/view/abstract-view.js';

const noInfoTemplateCreation = () => (
  `<p class="trip-events__msg">
    There is no data by some reason...
  </p>`);

export default class NoDataForm extends AbstractView {
  get template() {
    return noInfoTemplateCreation();
  }
}

