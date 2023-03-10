import { render } from './render.js';
import EventListForm from './view/event-list-form.js';
import PointForm from './view/point-form.js';
import EditForm from './view/edit-form.js';
import SortForm from './view/sort-form.js';


export default class TripEventsPresenter {
  constructor(dataTrip) {
    this.eventsList = new EventListForm();
    this.dataTrip = dataTrip;
  }

  init(pointsModel) {
    this.pointsModel = pointsModel;
    this.offers = [...this.pointsModel.getOffers()];
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];

    render(new SortForm(), this.dataTrip);
    render(this.eventsList, this.dataTrip);
    render(new EditForm(this.boardPoints[0], this.destinations, this.offers), this.eventsList.getElement());

    for (const point of this.boardPoints)
    {
      render(new PointForm(point, this.destinations, this.offers), this.eventsList.getElement());
    }
  }
}
