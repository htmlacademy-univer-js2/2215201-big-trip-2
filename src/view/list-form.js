import AbstractView from '../framework/view/abstract-view.js';

const pointListTemplateCreation = () => (
  `<ul class="trip-events__list">

   </ul>`
);

export default class ListForm extends AbstractView {
  get template () {
    return pointListTemplateCreation();
  }
}
