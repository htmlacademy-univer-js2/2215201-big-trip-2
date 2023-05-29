import ApiService from '../framework/api-service.js';
import {ApiServiceResponse} from '../consts.js';

export default class DestinationApi extends ApiService {
  get destinations() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  updateDestination = async (destination) => {
    const response = await this._load({
      url: `destinations/${destination.id}`,
      method: ApiServiceResponse.PUT,
      body: JSON.stringify(destination),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response)

    return parsedResponse;
  }
}
