import { Update } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable{
  #points = [];
  #pointApi = null;
  #isSuccessfulLoading = false;

  constructor(pointApi) {
    super();
    this.#pointApi = pointApi;
  }

  init = async () => {
    try {
      const points = await this.#pointApi.points;
      this.#points = points.map(this.#adapted);
      this.#isSuccessfulLoading = true;
    } catch(e) {
      this.#points = [];
      this.#isSuccessfulLoading = false;
    }

    this._notify(Update.INIT);
  };

  get isSuccessfulLoading() {
    return this.#isSuccessfulLoading;
  }

  get points() {
    return this.#points;
  }

  addPoint = async (updateType, update) => {
    try {
      const added = this.#adapted(await this.#pointApi.addPoint(update));
      this.#points.unshift(added);
      this._notify(updateType, added);
    } catch(e) {
      throw new Error('Can not add the point');
    }
  };

  deletePoint = async (updateType, update) => {
    const i = this.#points.findIndex((p) => p.id === update.id);

    if (i === -1) {
      throw new Error('Can not delete not existing point');
    }

    try {
      await this.#pointApi.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, i),
        ...this.#points.slice(i + 1),
      ];
      this._notify(updateType);
    } catch(e) {
      throw new Error('Can not delete the point');
    }
  };

  updatePoint = async (updateType, update) => {
    const i = this.#points.findIndex((point) => point.id === update.id);

    if (i === -1) {
      throw new Error('Can not update not existing point');
    }

    try {
      const adapted = this.#adapted(await this.#pointApi.updatePoint(update));
      this.#points = [
        ...this.#points.slice(0, i),
        adapted,
        ...this.#points.slice(i + 1),
      ];
      this._notify(updateType, adapted);
    } catch(e) {
      throw new Error('Can not update');
    }
  };

  #adapted = (point) => {
    const adapted = {...point,
      basePrice: point['base_price'],
      dateFrom: (point['date_from'] !== null || point['date_from'] !== undefined) ?
        new Date(point['date_from']) : point['date_from'],
      dateTo: (point['date_to'] !== null || point['date_to'] !== undefined) ?
        new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adapted['base_price'];
    delete adapted['date_from'];
    delete adapted['date_to'];
    delete adapted['is_favorite'];

    return adapted;
  };
}
