import { Filter } from '../const.js';
import Observable from '../framework/observable.js';

export default class FilterModel extends Observable {
  #filter = Filter.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filterType) => {
    this.#filter = filterType;
    this._notify(updateType, filterType);
  };
}
