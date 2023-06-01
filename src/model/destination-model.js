import Observable from '../framework/observable.js';

export default class DestinationModel extends Observable {
  #destinations = [];
  #destApiService = null;

  constructor(destApiService) {
    super();
    this.#destApiService = destApiService;
  }

  init = async () => {
    try {
      this.#destinations = await this.#destApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }
  };

  get destinations() {
    return this.#destinations;
  }
}
