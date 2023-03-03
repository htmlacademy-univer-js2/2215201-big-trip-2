import { render } from './render.js';
import FilterForm from './view/filter-form.js';
import MenuForm from './view/menu-form.js';
import TripEventsPresenter from './presenter.js';

const presenter = new TripEventsPresenter();
const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-main');

render(new FilterForm(), headerElement.querySelector('.trip-controls__filters'));
render(new MenuForm(), headerElement.querySelector('.trip-controls__navigation'));

presenter.init(mainElement.querySelector('.trip-events'));
