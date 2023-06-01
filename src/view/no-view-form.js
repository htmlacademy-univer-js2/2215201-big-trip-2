import AbstractView from '../framework/view/abstract-view.js';
import { Filter } from '../consts.js';

const NoPointsType = {
  [Filter.FUTURE]: 'No future event right now',
  [Filter.PAST]: 'No past events right now',
  [Filter.EVERYTHING]: 'Create your first point!'
};

const noViewFormTemplateCreation = (filterType) => {
  const noPointValue = NoPointsType[filterType];

  return (`<p class="trip-events__msg">${noPointValue}</p>`);
};

export default class NoViewForm extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return noViewFormTemplateCreation(this.#filterType);
  }
}
