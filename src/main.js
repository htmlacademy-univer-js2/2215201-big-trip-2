import { render } from './framework/render.js';
import {getPoints, getDestinations, getOffers} from './mock/point.js';
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

render(new FilterForm(), headerElement.querySelector('.trip-controls__filters'));
render(new MenuForm(), headerElement.querySelector('.trip-controls__navigation'));

pointsModel.init(points, destinations, offers);
presenter.init(pointsModel);
