import dayjs from 'dayjs';

const HOUR_MINUTES_COUNT = 60;
const TOTAL_DAY_MINUTES_COUNT = 1440;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';

const humanizePointDueDate = (date) => dayjs(date).format('DD MMM');

const getDaysOutput = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;
const getHoursOutput = (days, restHours) => (days <= 0 && restHours <= 0) ? '' : `${`${restHours}`.padStart(2, '0')}H`;

const getMinutesOutput = (restMinutes) => `${`${restMinutes}`.padStart(2, '0')}M`;

const duration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.floor(difference / TOTAL_DAY_MINUTES_COUNT);
  const restHours = Math.floor((difference - days * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const restMinutes = difference - (days * TOTAL_DAY_MINUTES_COUNT + restHours * HOUR_MINUTES_COUNT);

  const daysOutput = getDaysOutput(days);
  const hoursOutput = getHoursOutput(days, restHours);
  const minutesOutput = getMinutesOutput(restMinutes);

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const getDate = (date) => dayjs(date).format(DATE_FORMAT);

const getTime = (date) => dayjs(date).format(TIME_FORMAT);

const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);

const getRandomInteger = (a = 0, b = 1) => {
  const left = Math.ceil(Math.min(a, b));
  const right = Math.floor(Math.max(a, b));

  return Math.floor(left + Math.random() * (right - left + 1));
};

const getRandomElement = (items) => {
  const min = 0;
  const max = items.length - 1;
  return items[getRandomInteger(min, max)];
};

const isDatePast = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;
const isDateFuture = (dateFrom) => dayjs().diff(dateFrom, 'minute') <= 0;
const isDatePastFuture = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') > 0 && dayjs().diff(dateTo, 'minute') < 0;

const sortByPricePoint = (firstPoint, secondPoint) => secondPoint - firstPoint;
const sortByDayPoint = (firstPoint, secondPoint) => dayjs(firstPoint.dateFrom).diff(dayjs(secondPoint.dateFrom));
const sortByTimePoint = (firstPoint, secondPoint) => dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom)) - dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom));

export {getRandomInteger, getRandomElement, humanizePointDueDate, duration, getDate, getDateTime, getTime,
  isDatePastFuture, isDatePast, isDateFuture, sortByPricePoint, sortByDayPoint, sortByTimePoint};
