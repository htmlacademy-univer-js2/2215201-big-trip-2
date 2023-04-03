import { render, replace } from './framework/render.js';
import EventListForm from './view/event-list-form.js';
import PointForm from './view/point-form.js';
import EditForm from './view/edit-form.js';
import SortForm from './view/sort-form.js';
import NoViewForm from './view/no-view-form.js';


export default class TripEventsPresenter {
  #offers = null;
  #dataTrip = null;
  #nodesModel = null;
  #destinations = null;
  #boardPoints = null;
  #eventsList = null;

  constructor(dataTrip) {
    this.#eventsList = new EventListForm();
    this.#dataTrip = dataTrip;
  }

  init(pointsModel) {
    this.#nodesModel = pointsModel;
    this.#offers = [...this.#nodesModel.offers];
    this.#boardPoints = [...this.#nodesModel.points];
    this.#destinations = [...this.#nodesModel.destinations];

    if (this.#boardPoints.length === 0) {
      render(new NoViewForm(), this.#dataTrip)
    }
    else {
      render(new SortForm(), this.#dataTrip);
      render(this.#eventsList, this.#dataTrip);
      for (const point of this.#boardPoints) {
        this.#renderPoint(point);
      }
    }
  }

  #renderPoint = (node) => {
    const editComponent = new EditForm(node, this.#destinations, this.#offers);
    const component = new PointForm(node, this.#destinations, this.#offers);

    const replacePointToEditForm = () => {
      replace(editComponent, component);
    };

    const replaceEditFormToPoint = () => {
      replace(component, editComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    editComponent.setFormSubmitHandler(() => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    component.setEditClickHandler(() => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editComponent.setPreviewClickHandler(() => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(component, this.#eventsList.element)
  };
}
