export const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
export const AUTHORIZATION = 'Basic hahahahx0hahahah';

export const Action = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const Filter = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
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

export const PointCaption = {
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

export const Update = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const Sort = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

export const SortCaption = {
  [Sort.DAY]: 'Day',
  [Sort.EVENT]: 'Event',
  [Sort.TIME]: 'Time',
  [Sort.PRICE]: 'Price',
  [Sort.OFFER]: 'Offer',
};

export const ApiServiceResponse = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export const Time = {
  MIN: 350,
  MAX: 1000,
};
