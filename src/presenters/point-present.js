import { render, replace, remove } from '../framework/render.js';
import { Action, Update } from '../const.js';
import PreviewPointForm from '../view/preview-point-form.js';
import PointForm from '../view/point-form.js';
import {isEsc} from '../utils.js';

const Mode = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

export default class PointPresent {
  #pointListContainer = null;
  #pointComponent = null;
  #editComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #changeData = null;
  #changeMode = null;

  #mode = Mode.PREVIEW;
  #destinations = null;
  #offers = null;
  #point = null;

  constructor({pointListContainer, changeData, changeMode, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#offersModel = offersModel;
    this.#changeData = changeData;
    this.#destinationsModel = destinationsModel;
    this.#changeMode = changeMode;
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.PREVIEW) {
      this.#editComponent.reset(this.#point);
      this.#replaceEditToPreview();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.PREVIEW) {
      this.#pointComponent.shake();
      return;
    }

    this.#editComponent.shake(this.#resetFormState);
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  #resetFormState = () => {
    this.#editComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  #replaceEditToPreview = () => {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.PREVIEW;
  };


  #replacePreviewToEdit = () => {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      Action.UPDATE_POINT,
      Update.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleEditClick = () => {
    this.#replacePreviewToEdit();
  };

  #handlePreviewClick = () => {
    this.resetView();
  };

  #escKeyDownHandler = (evt) => {
    if (isEsc(evt.key)) {
      evt.preventDefault();
      this.resetView();
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      Action.UPDATE_POINT,
      Update.MINOR,
      point,
    );
  };

  #handleResetClick = (point) => {
    this.#changeData(
      Action.DELETE_POINT,
      Update.MINOR,
      point,
    );
  };

  init(point) {
    this.#point = point;
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    const prevPreviewPointComponent = this.#pointComponent;
    const prevEditingPointComponent =  this.#editComponent;

    this.#pointComponent = new PreviewPointForm(point, this.#destinations, this.#offers);
    this.#editComponent = new PointForm({
      point: point,
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: false
    });

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editComponent.setResetClickHandler(this.#handleResetClick);

    if (prevPreviewPointComponent === null || prevEditingPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    switch (this.#mode) {
      case Mode.PREVIEW:
        replace(this.#pointComponent, prevPreviewPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#pointComponent, prevEditingPointComponent);
        this.#mode = Mode.PREVIEW;
        break;
    }

    remove(prevPreviewPointComponent);
    remove(prevEditingPointComponent);
  }
}

