import dayjs from 'dayjs';
import {Sort} from './const.js';

const DATE = 'YYYY-MM-DD';
const DATE_TIME = 'DD/MM/YY HH:mm';
const TIME = 'HH:mm';

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;

export const reformatDate = (date) => dayjs(date).format('DD MMM');

export const getMinutes = (minutes) => `${`${minutes}`.padStart(2, '0')}M`;
export const getHours = (days, hours) => (hours <= 0 && days <= 0) ? '' : `${`${hours}`.padStart(2, '0')}H`;
export const getDays = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;

export const calculateDuration = (dateFrom, dateTo) => {
  const difference = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  const restDays = Math.trunc(difference / MINUTES_PER_DAY);
  const restHours = Math.trunc((difference - restDays * MINUTES_PER_DAY) / MINUTES_PER_HOUR);
  const restMinutes = difference - (restDays * MINUTES_PER_DAY + restHours * MINUTES_PER_HOUR);
  const days = getDays(restDays);
  const hours = getHours(restDays, restHours);
  const minutes = getMinutes(restMinutes);

  return `${days} ${hours} ${minutes}`;
};

export const sortByPrice = (first, second) => second.basePrice - first.basePrice;

export const sortByDay = (first, second) => dayjs(first.dateFrom).diff(dayjs(second.dateFrom));

export const sortByTime = (first, second) => dayjs(second.dateTo).diff(dayjs(second.dateFrom)) - dayjs(first.dateTo).diff(dayjs(first.dateFrom));

export const getDate = (date) => dayjs(date).format(DATE);

export const getTime = (date) => dayjs(date).format(TIME);

export const getDateTime = (date) => dayjs(date).format(DATE_TIME);


export const isPast = (to) => dayjs().diff(to, 'minute') > 0;

export const isFuture = (from) => dayjs().diff(from, 'minute') <= 0;

export const isPastFuture = (from, to) => dayjs().diff(from, 'minute') > 0 && dayjs().diff(to, 'minute') < 0;

export const isEsc = (key) => key === 'Escape' || key === 'Esc';

export const sorting = {
  [Sort.DAY]: (points) => points.sort(sortByDay),
  [Sort.TIME]: (points) => points.sort(sortByTime),
  [Sort.PRICE]: (points) => points.sort(sortByPrice)
};
