import {sortByDayPoint, sortByPricePoint, sortByTimePoint} from '../utils';

export const SortType = {
  PRICE: 'price',
  DAY: 'day',
  EVENT: 'event',
  OFFER: 'offer',
  TIME: 'time'
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
  PATCH: 'PATCH'
};

export const FilterType = {
  FUTURE: 'future',
  EVERYTHING: 'everything',
  PAST: 'past'
};

export{sorting};
