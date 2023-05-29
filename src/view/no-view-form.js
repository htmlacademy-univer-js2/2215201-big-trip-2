import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../mock/consts.js';

const NoPointsType = {
  [FilterType.FUTURE]: 'No future event right now',
  [FilterType.PAST]: 'No past events right now',
  [FilterType.EVERYTHING]: 'Create your first point!'
};

const noViewFormTemplateCreation = () => {
  const noPointValue = NoPointsType[filterType];

  return (`<p class="trip-events__msg">${noPointValue}</p>`);
};

export default class NoViewForm extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filtertype;
  }

  get template() {
    return noViewFormTemplateCreation(this.#filterType);
  }
}
