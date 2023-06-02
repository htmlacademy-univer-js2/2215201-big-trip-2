import { isPastFuture, isFuture, isPast } from './utils.js';
import { Filter } from './const.js';

export const filter = {
  [Filter.EVERYTHING]: (points) => points,
  [Filter.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom) || isPastFuture(point.dateFrom, point.dateTo)),
  [Filter.PAST]: (points) => points.filter((point) => isPast(point.dateTo) || isPastFuture(point.dateFrom, point.dateTo)),
};

