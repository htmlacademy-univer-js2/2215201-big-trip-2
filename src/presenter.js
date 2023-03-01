import { render } from './render.js';
import EventListForm from './view/event-list-form.js';
import CreateForm from './view/create-form.js';
import PointForm from './view/point-form.js';
import EditForm from './view/edit-form.js';
import SortForm from './view/sort-form.js';

class TripEventsPresenter {
  constructor() {
    this.eventsList = new EventListForm();
  }

  init (tripContainer) {
    this.tripContainer = tripContainer;
    render(new EditForm(), this.eventsList.getElement());
    render(new SortForm(), this.tripContainer);
    render(this.eventsList, this.tripContainer);

    for (let i = 0; i < 3; i++){
      render(new PointForm(), this.eventsList.getElement());
    }

    render(new CreateForm(), this.eventsList.getElement());
  }
}

export default { TripEventsPresenter };
