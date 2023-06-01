import {humanizePointDueDate} from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const renderInfo = (points, destinations) => {
  if (points.length === 0) {return '';}

  const InfoNoRepeats = [points[0].destination];
  for (let i = 1; i < points.length; i++) {
    if (points[i].destination !== points[i-1].destination) {
      InfoNoRepeats.push(points[i].destination);
    }
  }

  if (InfoNoRepeats.length > 3) {
    const start = destinations.find((object) => object.id === InfoNoRepeats[0]);
    const finish = destinations.find((object) => object.id === InfoNoRepeats[InfoNoRepeats.length - 1]);
    return `${start.name} &mdash; ... &mdash; ${finish.name}`;
  }

  return InfoNoRepeats
    .map((dest) => `${destinations
    .find((object) => object.id === dest).name}`)
    .join(' &mdash; ');

};

const getPricePointOffers = (point, offers) => {
  if (offers.length === 0) {return 0;}

  let price = 0;
  const offersTyped = offers.find((offer) => offer.type === point.type);
  const pointOffers = point.offers;
  pointOffers.forEach((offer) => {
    price += offersTyped.offers.find((item) => item.id === offer).price;
  });
  return price;
};

const renderTotalPriceTrip = (points, offers) => {
  if (points.length === 0) {return '';}

  let total = 0;
  points.forEach((point) => {
    total += point.basePrice;
    total += getPricePointOffers(point, offers);
  });
  return `Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>`;
};
const renderInfoDate = (points) => {
  if (points.length === 0) {
    return '';
  }
  const start = points[0].dateFrom !== null ? humanizePointDueDate(points[0].dateFrom) : '';
  const finish = points[points.length - 1]
    .dateTo !== null ? humanizePointDueDate(points[points.length - 1].dateTo) : '';
  return `${start}&nbsp;&mdash;&nbsp;${finish}`;
};

const createTripInfoTemplate = (destinations, offers, points) => {
  if (destinations.length === 0 || offers.length === 0) {
    return '';
  }
  return    `<div class="trip-info">
                <div class="trip-info__main">
                    <h1 class="trip-info__title">${renderInfo(points, destinations)}</h1>
                        <p class="trip-info__dates">${renderInfoDate(points)}</p>
                </div>
                <p class="trip-info__cost">${renderTotalPriceTrip(points, offers)}</p>
            </div>`;
};

export default class InfoForm extends AbstractView {
  #destinations = null;
  #offers = null;
  #points = null;

  constructor(destinations, offers, points) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = points;
  }

  get template () {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
