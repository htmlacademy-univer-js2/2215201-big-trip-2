import {sortByDayPoint, sortByPricePoint, sortByTimePoint} from './utils.js';

export const SORT_TYPES_OFF = ['event', 'offer'];

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const sorting = {
  [SortType.DAY]: (points) => points.sort(sortByDayPoint),
  [SortType.TIME]: (points) => points.sort(sortByTimePoint),
  [SortType.PRICE]: (points) => points.sort(sortByPricePoint)
};

export const Action = {
  DELETE_POINT: 'DELETE_POINT',
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT'
};

export const UpdateType = {
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  PATCH: 'PATCH',
  INIT: 'INIT'
};

export const FilterType = {
  FUTURE: 'future',
  EVERYTHING: 'everything',
  PAST: 'past'
};

export const SortTypeDescription = {
  [SortType.DAY]: 'Day',
  [SortType.EVENT]: 'Event',
  [SortType.TIME]: 'Time',
  [SortType.PRICE]: 'Price',
  [SortType.OFFER]: 'Offer'
};

export const PointType = {
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
  [PointType.TAXI]: 'Taxi',
  [PointType.BUS]: 'Bus',
  [PointType.TRAIN]: 'Train',
  [PointType.SHIP]: 'Ship',
  [PointType.DRIVE]: 'Drive',
  [PointType.FLIGHT]: 'Flight',
  [PointType.CHECK_IN]: 'Check-in',
  [PointType.SIGHTSEEING]: 'Sightseeing',
  [PointType.RESTAURANT]: 'Restaurant'
};

export const ApiServiceResponse = {
  GET: 'GET',
  PUT: 'PUT'
};

export{sorting};
