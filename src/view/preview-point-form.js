import {reformatDate, calculateDuration, getDate, getTime } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';
import he from 'he';

const renderOffer = (offers, checked) => {
  if (!offers) { return ''; }
  let outputForm = '';
  offers.offers.forEach((offer) => {
    if (checked.includes(offer.id)) {
      outputForm = `${outputForm}<li class="event__offer"><span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span></li>`;
    }
  });
  return outputForm;
};

const previewPointTemplateCreation = (point, destinations, offersGlobal) => {
  const {basePrice, type, destination, isFavorite, dateFrom, dateTo, offers} = point;
  const allPoints = offersGlobal.find((offer) => offer.type === type);
  const duration = calculateDuration(dateFrom, dateTo);
  const data = destinations.find((item) => item.id === destination);
  const start = dateFrom !== null ? reformatDate(dateFrom) : '';
  const end = dateTo !== null ? reformatDate(dateTo) : '';
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getDate(dateFrom)}">${start}</time>
        <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
      </div>
      <h3 class="event__title">${type} ${data ? he.encode(data.name) : ''}</h3>
      <div class="event__schedule">
        <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${(start === end) ? getTime(dateFrom) : start}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${(start === end) ? getTime(dateTo) : end}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${renderOffer(allPoints, offers)}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
      </button>
      <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
      </button>
      </div>
    </li>`
  );
};

export default class PreviewPointForm extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;

  constructor(point, destination, offers) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  setFavoriteClickHandler = (cb) => {
    this._callback.favoriteClick = cb;
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  setEditClickHandler = (cb) => {
    this._callback.editClick = cb;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  };

  get template () {
    return previewPointTemplateCreation(this.#point, this.#destination, this.#offers);
  }
}
