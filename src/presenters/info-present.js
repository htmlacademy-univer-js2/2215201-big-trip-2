import { render, remove } from '../framework/render.js';
import InfoForm from '../view/info-form.js';

export default class InfoPresent {
  #tripInfoComponent = null;
  #destinationModel = null;
  #offerModel = null;
  #infoContainer = null;

  #points = null;
  #destinations = null;
  #offers = null;

  constructor(infoContainer, destModel, offerModel) {
    this.#infoContainer = infoContainer;
    this.#offerModel = offerModel;
    this.#destinationModel = destModel;
  }

  init = (points) => {
    this.#points = points;
    this.#destinations = [...this.#destinationModel.destinations];
    this.#offers = [...this.#offerModel.offers];

    this.#tripInfoComponent = new InfoForm(this.#points, this.#destinations, this.#offers);

    render(this.#tripInfoComponent, this.#infoContainer);
  };

  destroy = () => { remove(this.#tripInfoComponent); };
}

