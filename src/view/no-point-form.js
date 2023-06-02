import { Filter } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const PointsCaption = {
  [Filter.EVERYTHING]: 'Click New Event to create your first point',
  [Filter.PAST]: 'There are no past events now',
  [Filter.FUTURE]: 'There are no future events now',
};

const NoPointTemplateCreation = (filter) => (
  `<p class="trip-events__msg">
    ${PointsCaption[filter]}
  </p>`
);

export default class NoPointForm extends AbstractView {
  #filterType = null;

  constructor(filter) {
    super();
    this.#filterType = filter;
  }

  get template() {
    return NoPointTemplateCreation(this.#filterType);
  }
}
