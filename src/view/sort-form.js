import { Sort, SortCaption } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const NO_SORT = [Sort.EVENT, Sort.OFFER];

const sortTemplateCreation = (currentSort) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(Sort).map((sort) => `<div class="trip-sort__item  trip-sort__item--${sort}">
    <input ${currentSort === sort ? 'checked' : ''} data-sort-type=${sort} id="sort-${sort}"
        class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}"
        ${NO_SORT.includes(sort) ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${sort}">${SortCaption[sort]}</label>
  </div>`).join('')}</form>`;

export default class SortForm extends AbstractView {
  #currentSort = null;

  constructor(currentSort) {
    super();
    this.#currentSort = currentSort;
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  setSortTypeChangeHandler = (cb) => {
    this._callback.sortTypeChange = cb;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  get template () {
    return sortTemplateCreation(this.#currentSort);
  }
}
