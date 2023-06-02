import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilter) => {
  const {type, name, count} = filter;

  return (
    `<div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${type === currentFilter ? 'checked' : ''} value="${type}" ${count === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const templateFilterCreation = (items, currentFilter) => {
  const filtered = items
    .map((filter) => createFilterItemTemplate(filter, currentFilter)).join('');

  return `<form class="trip-filters" action="#" method="get">
            ${filtered}
            <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};

export default class FilterForm extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  setFilterTypeChangeHandler = (cb) => {
    this._callback.filterTypeChange = cb;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };

  get template() {
    return templateFilterCreation(this.#filters, this.#currentFilter);
  }
}
