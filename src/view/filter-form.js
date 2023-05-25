import AbstractView from '../framework/view/abstract-view.js';

const filterObjectTemplateCreation = (filter, filterType) => {
  const {type, name, count} = filter;

  return (
    `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${type === filterType ? 'checked' : ''} value="${type}" ${count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`
  );
}

const filterFormTemplateCreation = (filterObjects, currentFilterType) => {
  const filterObjectsTemplate = filterObjects
    .map((filter, index) => filterObjectTemplateCreation(filter, currentFilterType))
    .join(' ');
  return `<form class="trip-filters" action="#" method="get">
    ${filterObjectsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FilterForm extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template () { return filterFormTemplateCreation(this.#filters, this.#currentFilter); }

  setFilterTypeChangeHandler = (cb) => {
    this._callback.filterTypeChange = cb;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
