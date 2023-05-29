import AbstractView from '../framework/view/abstract-view.js';

const menuFormTemplateCreation = () => (
  `
  <nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                <a class="trip-tabs__btn" href="#">Stats</a>
              </nav>
  `
);

export default class MenuForm extends AbstractView {
  get template () { return menuFormTemplateCreation(); }
}
