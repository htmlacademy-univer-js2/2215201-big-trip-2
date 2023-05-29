import ApiService from '../framework/api-service.js';
import {ApiServiceResponse} from '../consts.js';

export default class OfferApi extends ApiService {
  get offers() {
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  updateOffer = async (offer) => {
    const response = await this._load({
      url: `offers/${offer.id}`,
      method: ApiServiceResponse.PUT,
      body: JSON.stringify(offer),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
