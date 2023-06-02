import { render, RenderPosition, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ListForm from '../view/list-form.js';
import SortForm from '../view/sort-form.js';
import NoPointForm from '../view/no-point-form.js';
import LoadForm from '../view/load-form.js';
import NoDataForm from '../view/no-data-form.js';
import PointPresent from './point-present.js';
import NewPointPresent from './new-point-present.js';
import { sorting } from '../utils.js';
import { filter } from '../filter.js';
import { Update, Action, Sort, Filter, Time } from '../const.js';
import InfoPresent from './info-present.js';

export default class BoardPresent {
  #infoContainer = null;
  #baseContainer = null;
  #pointModel = null;
  #offerModel = null;
  #filterModel = null;
  #noPointComponent = null;
  #sortComponent = null;
  #destinationsModel = null;
  #pointListComponent = new ListForm();
  #loadingComponent = new LoadForm();
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #infoPresenter = null;
  #currentSort = Sort.DAY;
  #filterType = Filter.EVERYTHING;
  #isLoading = true;
  #noData = new NoDataForm();
  #uiBlocker = new UiBlocker(Time.MIN, Time.MAX);

  constructor({tripInfoContainer, tripContainer, pointsModel: pointModel, filterModel, destinationsModel, offersModel}) {
    this.#infoContainer = tripInfoContainer;
    this.#baseContainer = tripContainer;
    this.#pointModel = pointModel;
    this.#destinationsModel = destinationsModel;
    this.#offerModel = offersModel;
    this.#filterModel = filterModel;


    this.#newPointPresenter = new NewPointPresent({
      pointListContainer: this.#pointListComponent.element,
      changeData: this.#handleAction,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offerModel
    });

    this.#destinationsModel.addObserver(this.#handleEvent);
    this.#offerModel.addObserver(this.#handleEvent);
    this.#pointModel.addObserver(this.#handleEvent);
    this.#filterModel.addObserver(this.#handleEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    sorting[this.#currentSort](filteredPoints);
    return filteredPoints;
  }

  createPoint = (cb) => {
    this.#currentSort = Sort.DAY;
    this.#filterModel.setFilter(Update.MAJOR, Filter.EVERYTHING);
    if (this.#noPointComponent) {
      render(this.#pointListComponent, this.#baseContainer);
    }
    this.#newPointPresenter.init(cb);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresent({
      pointListContainer: this.#pointListComponent.element,
      changeData: this.#handleAction,
      changeMode: this.#handleChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offerModel
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new SortForm(this.#currentSort);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortChange);

    render(this.#sortComponent, this.#baseContainer, RenderPosition.AFTERBEGIN);
  };

  #renderInfo = () => {
    this.#infoPresenter = new InfoPresent(this.#infoContainer, this.#destinationsModel, this.#offerModel);
    const sortedPoints = sorting[Sort.DAY](this.points);
    this.#infoPresenter.init(sortedPoints);
  };

  #renderNoData = () => { render(this.#noData, this.#baseContainer, RenderPosition.AFTERBEGIN); };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointForm(this.#filterType);
    render(this.#noPointComponent, this.#baseContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = (points) => {
    render(this.#pointListComponent, this.#baseContainer);
    this.#renderPoints(points);
  };

  #renderPoints = (points) => { points.forEach((point) => this.#renderPoint(point)); };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#baseContainer, RenderPosition.AFTERBEGIN);
  };

  #clear = ({resetSortType: resetSort = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSort) {
      this.#currentSort = Sort.DAY;
    }
  };

  #clearTripInfo = () => {
    this.#infoPresenter.destroy();
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#offerModel.offers.length === 0 || this.#offerModel.isSuccessfulLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfulLoading === false ||
      this.#pointModel.isSuccessfulLoading === false) {
      this.#renderNoData();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderPointList(points);
    this.#renderSort();
  };

  #handleChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case Action.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case Action.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case Action.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleEvent = (updateType, data) => {
    switch (updateType) {
      case Update.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case Update.MINOR:
        this.#clear();
        this.#clearTripInfo();
        this.#renderInfo();
        this.#renderBoard();
        break;
      case Update.MAJOR:
        this.#clear({resetSortType: true});
        this.#renderBoard();
        break;
      case Update.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        this.#renderInfo();
        break;
    }
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#currentSort = sortType;
    this.#clear();
    this.#renderBoard();
  };

  init() {
    this.#renderBoard();
  }
}


