import AbstractView from '../framework/view/abstract-view.js';

const eventListFormTemplateCreation = () => (
  `
    <ul class="trip-events__list">
    </ul>
  `
);

export default class EventListForm extends AbstractView{
  get template () { return eventListFormTemplateCreation; }
}
