import InfoForm from '../view/info-form.js';
import {render, remove} from '../framework/render.js';

export default class InfoPresenter {
  #destinationModel = null;
  #offerModel = null;
  #infoComponent = null;
  #infoContainer = null;

  #points = null;
  #destinations = null;
  #offers = null;

  constructor(destinationModel, offerModel, infoContainer) {
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#infoContainer = infoContainer;
  }

  init = (points) => {
    this.#points = points;
    this.#destinations = [...this.#destinationModel.destinations];
    this.#offers = [...this.#offerModel.offers];

    this.#infoComponent = new InfoForm(this.#points, this.#destinations, this.#offers);

    render(this.#infoComponent, this.#infoContainer);
  }

  destroy = () => {
    remove(this.#infoComponent);
  };
}
