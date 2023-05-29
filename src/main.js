import {render} from './framework/render.js';
import {getPoints, getDestinations, getOffers} from './mock/point.js';

import MenuForm from './view/menu-form.js';
import NewButtonForm from './view/new-button-form.js';
import PointsModel from './model/node-model.js';
import FilterModel from './model/filter-model.js';
import BoardPresenter from './presenters/board-present.js';
import FilterPresent from './presenters/filter-present.js';

const siteMainElement = document.querySelector('.page-main');
const headerElement = document.querySelector('.page-header');
const pointsModel = new PointsModel();

const points = getPoints();
const offers = getOffers();
const destinations = getDestinations();

pointsModel.init(points, destinations, offers);

const filterModel = new FilterModel();
const filterPresenter = new FilterPresent(headerElement.querySelector('.trip-controls__filters'), filterModel, pointsModel);
filterPresenter.init();

const presenterBoard = new BoardPresenter(siteMainElement.querySelector('.trip-events'), pointsModel, filterModel);
presenterBoard.init();

const newPointButton = new NewButtonForm();

const handleNewPointFormClose = () => {
  newPointButton.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  presenterBoard.createPoint(handleNewPointFormClose);
  newPointButton.element.disable = true;
};

render(newPointButton, headerElement);
newPointButton.setClickHandler(handleNewPointButtonClick);

render(new MenuForm(), headerElement.querySelector('.trip-controls__navigation'));
