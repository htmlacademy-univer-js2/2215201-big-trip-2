import {isDateFuture, isDatePast, isDatePastFuture} from './utils.js';
import {FilterType} from './mock/consts.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isDatePast(point.dateTo)
    || isDatePastFuture(point.dateFrom, point.dateTo)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateFuture(point.dateFrom)
    || isDatePastFuture(point.dateFrom, point.dateTo))
};

export {filter};
