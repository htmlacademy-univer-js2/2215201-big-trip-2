import ApiService from '../framework/api-service.js';

export default class ApiOffer extends ApiService {
  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }
}
