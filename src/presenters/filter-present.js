import { render, replace, remove } from '../framework/render.js';
import { filter } from '../filter.js';
import { Filter, Update } from '../const.js';
import FilterForm from '../view/filter-form.js';

export default class FilterPresent {
  #filterContainer = null;
  #filterComponent = null;

  #filterModel = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({filterContainer, pointsModel, destinationsModel, offersModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleEvent);
    this.#filterModel.addObserver(this.#handleEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: Filter.EVERYTHING,
        name: Filter.EVERYTHING,
        count: filter[Filter.EVERYTHING](points).length,
      },
      {
        type: Filter.PAST,
        name: Filter.PAST,
        count: filter[Filter.PAST](points).length,
      },
      {
        type: Filter.FUTURE,
        name: Filter.FUTURE,
        count: filter[Filter.FUTURE](points).length,
      },
    ];
  }

  #handleEvent = () => {
    if (this.#offersModel.offers.length === 0 || this.#offersModel.isSuccessfulLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfulLoading === false ||
      this.#pointsModel.isSuccessfulLoading === false) {
      return;
    }
    this.init();
  };

  #handleFilterChange = (type) => {
    if (this.#filterModel.filter === type) {
      return;
    }

    this.#filterModel.setFilter(Update.MAJOR, type);
  };

  init = () => {
    const previous = this.#filterComponent;

    this.#filterComponent = new FilterForm(this.filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterChange);

    if (previous === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, previous);
    remove(previous);
  };
}
