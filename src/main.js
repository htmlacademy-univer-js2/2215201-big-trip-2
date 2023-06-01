import {render} from './framework/render.js';
import MenuForm from './view/menu-form.js';
import NewButtonForm from './view/new-button-form.js';
import PointsModel from './model/node-model.js';
import FilterModel from './model/filter-model.js';
import BoardPresenter from './presenters/board-present.js';
import FilterPresent from './presenters/filter-present.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';
import PointApi from './api-services/point-api.js';
import DestinationApi from './api-services/destination-api.js';
import OfferApi from './api-services/offer-api.js';
import {AUTHORIZATION, END_POINT} from './consts.js';

const mainElement = document.querySelector('.page-main');
const headerElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel(new PointApi(END_POINT, AUTHORIZATION));
const destinationModel = new DestinationModel(new DestinationApi(END_POINT, AUTHORIZATION));
const offerModel = new OfferModel(new OfferApi(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();
const filterPresenter = new FilterPresent({
  filterContainer: headerElement.querySelector('.trip-controls__filters'),
  pointsModel: pointsModel,
  filterModel: filterModel
});
filterPresenter.init();

const presenterBoard = new BoardPresenter(
  {
    tripContainer: mainElement.querySelector('.trip-events'),
    pointsModel: pointsModel,
    filterModel: filterModel,
    destinationsModel: destinationModel,
    offersModel: offerModel
  });
presenterBoard.init();

const newPointButton = new NewButtonForm();

const handleNewPointFormClose = () => {
  newPointButton.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  presenterBoard.createPoint(handleNewPointFormClose);
  newPointButton.element.disable = true;
};
offerModel.init()
  .finally(() => {destinationModel.init()
    .finally(() => {pointsModel.init()
      .finally(() => {render(newPointButton, headerElement); newPointButton
        .setClickHandler(handleNewPointButtonClick);
      });
    });
  });

render(new MenuForm(), headerElement.querySelector('.trip-controls__navigation'));
