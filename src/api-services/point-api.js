import {ApiServiceResponse} from '../consts.js';
import ApiService from '../framework/api-service.js';

export default class PointApi extends ApiService {
  get points() {
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiServiceResponse.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return ApiService.parseResponse(response);
  };

  #adaptToServer = (point) => {
    const moddedPoint = {...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    delete moddedPoint.basePrice;
    delete moddedPoint.dateFrom;
    delete moddedPoint.dateTo;
    delete moddedPoint.isFavorite;

    return moddedPoint;
  };

  addPoint = async (point) => {
    return await ApiService.this._load({
      url: 'points',
      method: ApiServiceResponse.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
  };

  deletePoint = async (point) => {
    return this._load({
      url: `points/${point.id}`,
      method: ApiServiceResponse.DELETE
    });
  };
}
