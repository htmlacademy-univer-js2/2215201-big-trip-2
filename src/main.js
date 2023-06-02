import { render } from './framework/render.js';
import { END_POINT, AUTHORIZATION } from './const.js';
import BoardPresent from './presenters/board-present.js';
import FilterPresent from './presenters/filter-present.js';
import MenuForm from './view/menu-form.js';
import NewButtonPresenter from './presenters/new-button-present.js';
import DestApiService from './api-services/api-destination.js';
import OfferApiService from './api-services/api-offer.js';
import FilterModel from './models/filter-model.js';
import DestinationModel from './models/destination-model.js';
import OfferModel from './models/offer-model.js';
import PointApiService from './api-services/api-points.js';
import PointModel from './models/point-model.js';

const pointModel = new PointModel(new PointApiService(END_POINT, AUTHORIZATION));
const offerModel = new OfferModel(new OfferApiService(END_POINT, AUTHORIZATION));
const destinationModel = new DestinationModel(new DestApiService(END_POINT, AUTHORIZATION));

const mainElement = document.querySelector('.page-main');
const headerElement = document.querySelector('.trip-main');

const filterModel = new FilterModel();
const filterPresenter = new FilterPresent({
  filterContainer: headerElement.querySelector('.trip-controls__filters'),
  pointsModel: pointModel,
  destinationsModel: destinationModel,
  offersModel: offerModel,
  filterModel: filterModel
});
filterPresenter.init();

const boardPresenter = new BoardPresent({
  tripInfoContainer: headerElement.querySelector('.trip-main__trip-info'),
  tripContainer: mainElement.querySelector('.trip-events'),
  pointsModel: pointModel,
  destinationsModel: destinationModel,
  offersModel: offerModel,
  filterModel: filterModel,
});
boardPresenter.init();

const newButtonPresenter = new NewButtonPresenter({
  newPointButtonContainer: headerElement,
  pointsModel: pointModel,
  offersModel: offerModel,
  destinationsModel: destinationModel,
  boardPresenter: boardPresenter
});
newButtonPresenter.init();

offerModel.init()
  .finally(() => {
    destinationModel.init()
      .finally(() => {
        pointModel.init()
          .finally(() => {
            newButtonPresenter.renderNewButton();
          });
      });
  });

render(new MenuForm(), headerElement.querySelector('.trip-controls__navigation'));
