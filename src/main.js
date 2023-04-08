import {render} from './framework/render.js';
import {getPoints, getDestinations, getOffers} from './mock/point.js';
import {generateFilter} from './mock/filter-generate';

import FilterForm from './view/filter-form.js';
import MenuForm from './view/menu-form.js';
import TripEventsPresenter from './presenter.js';
import PointsModel from './model/node-model.js';

const siteMainElement = document.querySelector('.page-main');
const headerElement = document.querySelector('.page-header');
const presenter = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'));

const pointsModel = new PointsModel();

const points = getPoints();
const offers = getOffers();
const destinations = getDestinations();
const filters = generateFilter(pointsModel.points);

pointsModel.init(points, destinations, offers);
presenter.init(pointsModel);

render(new FilterForm({filters}), headerElement.querySelector('.trip-controls__filters'));
render(new MenuForm(), headerElement.querySelector('.trip-controls__navigation'));
