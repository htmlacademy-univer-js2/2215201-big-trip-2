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

export{sorting};
