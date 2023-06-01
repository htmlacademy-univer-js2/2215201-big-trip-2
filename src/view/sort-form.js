import AbstractView from '../framework/view/abstract-view.js';
import {Sort, SortCaption, SORT_TYPES_OFF} from '../consts.js'

const sortFormTemplateCreation = (currentSortType) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${Object.values(Sort).map((sortType) => `<div class="trip-sort__item  trip-sort__item--${sortType}">
    <input ${currentSortType === sortType ? 'checked' : ''} data-sort-type=${sortType} id="sort-${sortType}"
    class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"
    ${SORT_TYPES_OFF.includes(sortType) ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${sortType}">${SortCaption[sortType]}</label>
  </div>`).join('')}</form>`;

export default class SortForm extends AbstractView {
  #currentSort = null;

  constructor(currentSort) {
    super();
    this.#currentSort = currentSort;
  }

  get template () { return sortFormTemplateCreation(this.#currentSort); }

  setSortTypeChangeHandler = (cb) => {
    this._callback.sortTypeChange = cb;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
