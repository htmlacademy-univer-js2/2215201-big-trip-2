import { render } from './render.js';
import EventListForm from './view/event-list-form.js';
import PointForm from './view/point-form.js';
import EditForm from './view/edit-form.js';
import SortForm from './view/sort-form.js';


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
    this.#offers = [...this.#nodesModel.offers()];
    this.#boardPoints = [...this.#nodesModel.points()];
    this.#destinations = [...this.#nodesModel.destinations()];

    render(new SortForm(), this.#dataTrip);
    render(this.#eventsList, this.#dataTrip);

    for (const point of this.#boardPoints)
    {
      this.#renderPoint(point);
    }
  }

  #renderPoint = (node) => {
    const editComponent = new EditForm(node, this.#destinations, this.#offers);
    const component = new PointForm(node, this.#destinations, this.#offers);

    const replacePointToEditForm = () => {
      this.#eventsList.element.replaceChild(editComponent.element, component.element);
    };

    const replaceEditFormToPoint = () => {
      this.#eventsList.element.replaceChild(component.element, editComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    editComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    component.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(component, this.#eventsList.element)
  };
}
