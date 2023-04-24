import {render} from './framework/render.js';
import {getPoints, getDestinations, getOffers} from './mock/point.js';
import {generateFilter} from './mock/filter-generate';


import FilterForm from './view/filter-form.js';
import MenuForm from './view/menu-form.js';
import PointsModel from './model/node-model.js';
import BoardPresenter from './presenters/board-present.js';

const siteMainElement = document.querySelector('.page-main');
const headerElement = document.querySelector('.page-header');
const pointsModel = new PointsModel();

const points = getPoints();
const offers = getOffers();
const destinations = getDestinations();

pointsModel.init(points, destinations, offers);
const presenterBoard = new BoardPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
presenterBoard.init(pointsModel);

const filters = generateFilter(pointsModel.points);

render(new FilterForm({filters}), headerElement.querySelector('.trip-controls__filters'));
render(new MenuForm(), headerElement.querySelector('.trip-controls__navigation'));
