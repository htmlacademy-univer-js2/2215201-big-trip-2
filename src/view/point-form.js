import { getDateTime } from '../utils.js';
import { Point, PointCaption } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';
import dayjs from 'dayjs';
import 'flatpickr/dist/flatpickr.min.css';

const BASED_POINT = {
  price: 99,
  destination: 1,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  offers: [],
  type: Point.TAXI,
  isFavorite: false
};

const renderOffers = (offers, checked, isDisabled) => offers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${checked.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join('');

const renderOffersContainer = (offers, checked, isDisabled) => (!offers || offers.offers.length === 0) ? '' :
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${renderOffers(offers.offers, checked, isDisabled)}
    </div>
    </section>`;

const renderDestinationPictures = (pics) => pics.length === 0 ? '' :
  pics.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`).join('');

const renderDestinationNames = (dests) => dests.length === 0 ? '' :
  dests.map((destination) => `<option value="${destination.name}"></option>`).join('');

const renderDestinationContainer = (dests) => {
  if (dests) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${dests.description !== null ? dests.description : ''}</p>
    <div class="event__photos-container">
                <div class="event__photos-tape">
                ${renderDestinationPictures(dests.pictures)}
                </div>
              </div>
  </section>`;
  }
  return '';
};

const renderEditingPointDateTemplate = (from, to, isDisabled) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateTime(from)}" ${isDisabled ? 'disabled' : ''}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateTime(to)}" ${isDisabled ? 'disabled' : ''}>
  </div>`
);

const renderEditingPointTypeTemplate = (currentType, isDisabled) => Object.values(Point).map((type) => `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${PointCaption[type]}</label>
</div>`).join('');

const renderResetButtonTemplate = (isNewPoint, isDisabled, isDeleting) => isNewPoint ? `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>` : `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
  <button class="event__rollup-btn" type="button">`;

const pointTemplateCreation = (point, destinations, allOffers, isNewPoint) => {
  const {basePrice, type, destination, dateFrom, dateTo, offers, isDisabled, isSaving, isDeleting} = point;
  const allPointTypeOffers = allOffers.find((offer) => offer.type === type);
  const destinationData = destinations.find((item) => item.id === destination);
  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${renderEditingPointTypeTemplate(type, isDisabled)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${destination}">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${destination}" type="text" name="event-destination" value="${destinationData ? he.encode(destinationData.name) : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${renderDestinationNames(destinations)}
          </datalist>
        </div>

        ${renderEditingPointDateTemplate(dateFrom, dateTo, isDisabled)}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        ${renderResetButtonTemplate(isNewPoint, isDisabled, isDeleting)}
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${renderOffersContainer(allPointTypeOffers, offers, isDisabled)}
        ${renderDestinationContainer(destinationData)}
      </section>
    </form>
  </li>`
  );
};

export default class PointForm extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #isNewPoint = null;
  #offersByType = null;

  constructor({point = BASED_POINT, destinations, offers, isNewPoint}) {
    super();
    this._state = PointForm.parseFromPoint(point);
    this.#isNewPoint = isNewPoint;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#offersByType = this.#offers.find((offer) => offer.type === this._state.type);
    this._restoreHandlers();
  }

  removeElement = () => {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  setPreviewClickHandler = (cb) => {
    this._callback.previewClick = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#previewClickHandler);
  };

  setFormSubmitHandler = (cb) => {
    this._callback.formSubmit = cb;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);
  };

  setResetClickHandler = (cb) => {
    this._callback.resetClick = cb;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formResetClickHandler);
  };

  #previewClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.previewClick();
  };

  reset = (point) => {
    this.updateElement(
      PointForm.parseFromPoint(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInsideHandlers();
    this.#setOutsideHandlers();
    this.#setPickerFrom();
    this.#setPickerTo();
  };

  #pointDateFromChangeHandler = ([data]) => {
    this.updateElement({
      dateFrom: data,
    });
  };

  #pointDateToChangeHandler = ([data]) => {
    this.updateElement({
      dateTo: data,
    });
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destinations.find((dest) => dest.name === evt.target.value);
    this.updateElement({
      destination: destination.id,
    });
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.offers = [];
    this.#offersByType = this.#offers.find((offer) => offer.type === evt.target.value);
    this.updateElement({
      type: evt.target.value,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointForm.parseToPoint(this._state));
  };

  #formResetClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.resetClick(PointForm.parseToPoint(this._state));
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const offerId = Number(evt.target.id.slice(-1));
    const offers = this._state.offers.filter((offer) => offer !== offerId);
    let currentOffers = [...this._state.offers];
    if (offers.length !== this._state.offers.length) {
      currentOffers = offers;
    }
    else {
      currentOffers.push(offerId);
    }
    this._setState({
      offers: currentOffers,
    });
  };

  #setPickerTo = () => {
    if (this._state.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          minDate: this._state.dateFrom,
          onChange: this.#pointDateToChangeHandler,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo
        },
      );
    }
  };

  #setPickerFrom = () => {
    if (this._state.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          maxDate: this._state.dateTo,
          onChange: this.#pointDateFromChangeHandler,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom
        },
      );
    }
  };

  #setOutsideHandlers = () => {
    if (!this.#isNewPoint) {
      this.setPreviewClickHandler(this._callback.previewClick);
    }
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setResetClickHandler(this._callback.resetClick);
  };

  #setInsideHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#pointDestinationChangeHandler);

    if (this.#offersByType && this.#offersByType.offers.length > 0)  {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#pointPriceChangeHandler);
  };

  static parseToPoint = (state) => {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };

  static parseFromPoint = (point) => ({...point,
    dateTo: dayjs(point.dateTo).toDate(),
    dateFrom: dayjs(point.dateFrom).toDate(),
    isDisabled: false,
    isDeleting: false,
    isSaving: false
  });

  get template () {
    return pointTemplateCreation(this._state, this.#destinations, this.#offers, this.#isNewPoint);
  }
}
