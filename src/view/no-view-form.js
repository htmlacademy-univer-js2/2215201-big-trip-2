import AbstractView from '../framework/view/abstract-view.js';

const noViewFormTemplateCreation = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point</p>`
);

export default class NoViewForm extends AbstractView {
  #element = null;

  get template() {
    return noViewFormTemplateCreation();
  }
}
