import {render, remove, RenderPosition} from '../framework/render.js';
import EventListForm from '../view/event-list-form.js';
import SortForm from '../view/sort-form.js';
import NoViewForm from '../view/no-view-form.js';
import PointPresenter from './point-present.js';
import {SortType, sorting, Action, FilterType, UpdateType} from '../mock/consts.js';
import {filter} from '../filter.js';
import PointNewPresenter from "./new-point-present";

export default class BoardPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #noPointComponent = null;
  #sortComponent = null;
  #pointListComponent = new EventListForm();

  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #sourcedBoardPoints = [];
  #currentSort = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor(tripContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#pointsModel);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    sorting[this.#currentSort](filteredPoints);
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  createPoint = (cb) => {
    this.#currentSort = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(cb);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (action, updateType, update) => {
    switch (action){
      case Action.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case Action.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case Action.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  }

  #handleSort = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#currentSort = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderSort = () => {
    this.#sortComponent = new SortForm(this.#currentSort);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSort);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#pointsModel, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoViewForm(this.#filterType);
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#tripContainer);
    this.#renderPoints(this.points);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#sortComponent)
    {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSort = SortType.DAY;
    }
  };

  #renderBoard = () => {
    const points = this.points;
    const counter = points.length;

    if (counter === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  };
}
