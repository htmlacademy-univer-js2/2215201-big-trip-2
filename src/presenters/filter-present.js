import {render, replace, remove} from '../framework/render.js';
import FilterForm from '../view/filter-form.js';
import {filter} from '../filter.js';
import {Filter, Update} from '../consts.js';

export default class FilterPresent {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor({filterContainer, pointsModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: Filter.FUTURE,
        name: 'FUTURE',
        count: filter[Filter.FUTURE](points).length
      },
      {
        type: Filter.PAST,
        name: 'PAST',
        count: filter[Filter.PAST](points).length
      },
      {
        type: Filter.EVERYTHING,
        name: 'EVERYTHING',
        count: filter[Filter.EVERYTHING](points).length
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterForm(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null){
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(Update.MAJOR, filterType);
  };
}
