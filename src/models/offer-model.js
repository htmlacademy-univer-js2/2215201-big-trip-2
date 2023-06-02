import Observable from '../framework/observable.js';

export default class OfferModel extends Observable{
  #offers = [];
  #offerApi = null;
  #isSuccessfulLoading = false;

  constructor(offerApi) {
    super();
    this.#offerApi = offerApi;
  }

  init = async () => {
    try {
      this.#offers = await this.#offerApi.offers;
      this.#isSuccessfulLoading = true;
    } catch(e) {
      this.#offers = [];
      this.#isSuccessfulLoading = false;
    }
  };

  get isSuccessfulLoading() {
    return this.#isSuccessfulLoading;
  }

  get offers() {
    return this.#offers;
  }
}

