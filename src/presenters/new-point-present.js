import { render, remove, RenderPosition } from '../framework/render.js';
import { Action, Update } from '../const.js';
import PointForm from '../view/point-form.js';
import {isEsc} from '../utils.js';

export default class NewPointPresent {

  #destinations = null;
  #offers = null;

  #pointListContainer = null;
  #changeData = null;
  #destroyCallback = null;
  #creatingPointComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  constructor({pointListContainer, changeData, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  destroy = () => {
    if (this.#creatingPointComponent === null) { return; }

    this.#destroyCallback?.();

    remove(this.#creatingPointComponent);
    this.#creatingPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setAborting = () => {
    this.#creatingPointComponent.shake(this.#resetFormState);
  };


  setSaving = () => {
    this.#creatingPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      Action.ADD_POINT,
      Update.MINOR,
      point,
    );
  };

  #resetFormState = () => {
    this.#creatingPointComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  #escKeyDownHandler = (evt) => {
    if (isEsc(evt.key)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  init = (cb) => {
    this.#destroyCallback = cb;

    if (this.#creatingPointComponent !== null) {
      return;
    }
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#creatingPointComponent = new PointForm({
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: true
    });
    this.#creatingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#creatingPointComponent.setResetClickHandler(this.#handleResetClick);

    render(this.#creatingPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };
}

