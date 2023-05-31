import {isDateFuture, isDatePast, isDatePastFuture} from './utils.js';
import {Filter} from './consts.js';

const filter = {
  [Filter.EVERYTHING]: (points) => points,
  [Filter.PAST]: (points) => points.filter((point) => isDatePast(point.dateTo)
    || isDatePastFuture(point.dateFrom, point.dateTo)),
  [Filter.FUTURE]: (points) => points.filter((point) => isDateFuture(point.dateFrom)
    || isDatePastFuture(point.dateFrom, point.dateTo))
};

export {filter};
