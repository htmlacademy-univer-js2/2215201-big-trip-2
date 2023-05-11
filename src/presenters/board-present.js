import {render, RenderPosition} from '../framework/render.js';
import EventListForm from '../view/event-list-form.js';
import SortForm from '../view/sort-form.js';
import NoViewForm from '../view/no-view-form.js';
import PointPresenter from './point-present.js';
import {updateObj, sortByPricePoint, sortByDayPoint, sortByTimePoint} from '../utils.js';
import {SortType, sorting} from '../mock/consts.js';

export default class BoardPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #boardPoints = null;

  #noPointComponent = new NoViewForm();
  #sortComponent = new SortForm();
  #pointListComponent = new EventListForm();

  #pointPresenter = new Map();
  #sourcedBoardPoints = [];
  #currentSort = SortType.DAY;

  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {

    this.#boardPoints = [...this.#pointsModel.points];

    this.#sourcedBoardPoints = [...this.#pointsModel.points]

    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();
      this.#renderPointList();
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateObj(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateObj(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoint = (sortType) => {
    this.#currentSort = sortType;
    sorting[sortType](this.#boardPoints);
  }

  #handleSort = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#sortPoint(sortType);
    this.#clearPointList();
    this.#renderPointList();
  }

  #renderSort = () => {
    sorting[SortType.DAY](this.#boardPoints);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSort);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#pointsModel, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#boardPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#tripContainer);
    this.#renderPoints(0, this.#boardPoints.length);
  };
}
