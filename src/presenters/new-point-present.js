import {render, remove, RenderPosition} from '../framework/render.js';
import EditForm from '../view/edit-form.js';
import {nanoid} from 'nanoid';
import {Action, UpdateType} from '../consts.js';

export default class PointNewPresenter {
  #pointListContainer = null;
  #editingPointComponent = null;
  #changeData = null;
  #destroyCallback = null;
  #pointsModel = null;
  #destinations = null;
  #offers = null;
  #destinationsModel = null;
  #offerModel = null;


  constructor({pointListContainer, changeData, pointsModel, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offerModel = offersModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editingPointComponent !== null) {
      return;
    }
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offerModel.offers];

    this.#editingPointComponent = new EditForm({
      destination: this.#destinations,
      offers: this.#offers,
      isNewPoint: true
    });
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editingPointComponent.setResetClickHandler(this.#handleResetClick);

    render(this.#editingPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editingPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editingPointComponent);
    this.#editingPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      Action.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };
}
