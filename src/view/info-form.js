import {reformatDate } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const renderDates = (points) => {
  if (points.length === 0) {
    return '';
  }
  const startDate = points[0].dateFrom !== null ? reformatDate(points[0].dateFrom) : '';
  const endDate = points[points.length - 1].dateTo !== null ? reformatDate(points[points.length - 1].dateTo) : '';
  return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
};

const renderRoute = (point, destinations) => {
  if (point.length === 0) {
    return '';
  }
  const noCheckedRoutes = [point[0].destination];
  for (let i = 1; i < point.length; i++) {
    if (point[i].destination !== point[i-1].destination) {noCheckedRoutes.push(point[i].destination);}
  }

  if (noCheckedRoutes.length >= 4) {
    const start = destinations.find((item) => item.id === noCheckedRoutes[0]);
    const finish = destinations.find((item) => item.id === noCheckedRoutes[noCheckedRoutes.length - 1]);
    return `${start.name} &mdash; ... &mdash; ${finish.name}`;
  }

  return noCheckedRoutes.map((destination) => `${destinations.find((item) => item.id === destination).name}`).join(' &mdash; ');

};

const getOffersPrice = (point, offers) => {
  if (offers.length === 0) {return 0;}
  let total = 0;
  const offersByType = offers.find((offer) => offer.type === point.type);
  const pointOffers = point.offers;
  pointOffers.forEach((offer) => {
    total += offersByType.offers.find((item) => item.id === offer).price;
  });
  return total;
};

const renderTotalPriceTrip = (points, offers) => {
  if (points.length === 0) {return '';}
  let total = 0;
  points.forEach((point) => {
    total += point.basePrice;
    total += getOffersPrice(point, offers);
  });
  return `Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>`;
};

const infoTemplateCreation = (points, dests, offers) => {
  if (dests.length === 0 || offers.length === 0) {return '';}
  return`<div class="trip-info">
            <div class="trip-info__main">
                <h1 class="trip-info__title">${renderRoute(points, dests)}</h1>
                <p class="trip-info__dates">${renderDates(points)}</p>
            </div>
            <p class="trip-info__cost">
                ${renderTotalPriceTrip(points, offers)}
            </p>
        </div>`;
};

export default class InfoForm extends AbstractView {
  #destinations = null;
  #offers = null;
  #points = null;

  constructor(points, dests, offers) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = dests;
  }

  get template () {
    return infoTemplateCreation(this.#points, this.#destinations, this.#offers);
  }
}

