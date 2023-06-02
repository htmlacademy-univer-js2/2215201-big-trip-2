import Observable from '../framework/observable.js';

export default class DestinationModel extends Observable {
  #destinations = [];
  #destApi = null;
  #isSuccessfulLoading = false;

  constructor(destApi) {
    super();
    this.#destApi = destApi;
  }

  init = async () => {
    try {
      this.#destinations = await this.#destApi.destinations;
      this.#isSuccessfulLoading = true;
    } catch(e) {
      this.#destinations = [];
      this.#isSuccessfulLoading = false;
    }
  };

  get isSuccessfulLoading() {
    return this.#isSuccessfulLoading;
  }

  get destinations() {
    return this.#destinations;
  }
}

