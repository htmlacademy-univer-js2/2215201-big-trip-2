import {sortByDayPoint, sortByPricePoint, sortByTimePoint} from './utils.js';

export const SORT_TYPES_OFF = ['event', 'offer'];

export const Sort = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const sorting = {
  [Sort.DAY]: (points) => points.sort(sortByDayPoint),
  [Sort.TIME]: (points) => points.sort(sortByTimePoint),
  [Sort.PRICE]: (points) => points.sort(sortByPricePoint)
};

export const Action = {
  DELETE_POINT: 'DELETE_POINT',
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT'
};

export const Update = {
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  PATCH: 'PATCH',
  INIT: 'INIT'
};

export const Filter = {
  FUTURE: 'future',
  EVERYTHING: 'everything',
  PAST: 'past'
};

export const SortCaption = {
  [Sort.DAY]: 'Day',
  [Sort.EVENT]: 'Event',
  [Sort.TIME]: 'Time',
  [Sort.PRICE]: 'Price',
  [Sort.OFFER]: 'Offer'
};

export const Point = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

export const PointTypeDescription = {
  [Point.TAXI]: 'Taxi',
  [Point.BUS]: 'Bus',
  [Point.TRAIN]: 'Train',
  [Point.SHIP]: 'Ship',
  [Point.DRIVE]: 'Drive',
  [Point.FLIGHT]: 'Flight',
  [Point.CHECK_IN]: 'Check-in',
  [Point.SIGHTSEEING]: 'Sightseeing',
  [Point.RESTAURANT]: 'Restaurant'
};

export const ApiServiceResponse = {
  GET: 'GET',
  PUT: 'PUT'
};
