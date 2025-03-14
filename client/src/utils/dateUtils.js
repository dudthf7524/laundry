import { format, parse, differenceInMinutes, addMinutes } from 'date-fns';

/**
 * Format a date string to a display format
 * @param {string} dateString - Date string in 'YYYY-MM-DD' format
 * @param {string} formatString - Format string (default: 'yyyy-MM-dd')
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, formatString = 'yyyy-MM-dd') => {
  if (!dateString) return '';
  try {
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Parse a time string to a Date object
 * @param {string} timeString - Time string in 'HH:mm' format
 * @param {Date} dateObj - Date object to use as base (default: current date)
 * @returns {Date} Date object representing the time
 */
export const parseTime = (timeString, dateObj = new Date()) => {
  if (!timeString) return null;
  try {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date(dateObj);
    date.setHours(hours, minutes, 0, 0);
    return date;
  } catch (error) {
    console.error('Error parsing time:', error);
    return null;
  }
};

/**
 * Calculate the duration between two time strings
 * @param {string} startTime - Start time in 'HH:mm' format
 * @param {string} endTime - End time in 'HH:mm' format
 * @returns {string} Duration in 'HH:mm' format
 */
export const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return '';

  try {
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    if (!start || !end) return '';

    const diffMinutes = differenceInMinutes(end, start);

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error calculating duration:', error);
    return '';
  }
};

/**
 * Convert minutes to a formatted time string
 * @param {number} minutes - Number of minutes
 * @returns {string} Time in 'HH:mm' format
 */
export const minutesToTimeString = (minutes) => {
  if (!minutes && minutes !== 0) return '';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * Parse a break time string to start and end times
 * @param {string} breakTimeString - Break time string in 'HH:mm ~ HH:mm' format
 * @returns {object} Object with start and end properties
 */
export const parseBreakTime = (breakTimeString) => {
  if (!breakTimeString) return { start: '', end: '' };

  try {
    const [start, end] = breakTimeString.split(' ~ ');
    return { start, end };
  } catch (error) {
    console.error('Error parsing break time:', error);
    return { start: '', end: '' };
  }
};

/**
 * Calculate total work hours including breaks and overtime
 * @param {string} startTime - Start time in 'HH:mm' format
 * @param {string} endTime - End time in 'HH:mm' format
 * @param {string} breakTimeString - Break time string in 'HH:mm ~ HH:mm' format
 * @returns {string} Total work hours in 'HH:mm' format
 */
export const calculateTotalWorkHours = (startTime, endTime, breakTimeString) => {
  if (!startTime || !endTime) return '';

  try {
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    if (!start || !end) return '';

    let totalMinutes = differenceInMinutes(end, start);

    // Subtract break time if provided
    if (breakTimeString) {
      const { start: breakStart, end: breakEnd } = parseBreakTime(breakTimeString);

      if (breakStart && breakEnd) {
        const breakStartTime = parseTime(breakStart);
        const breakEndTime = parseTime(breakEnd);

        if (breakStartTime && breakEndTime) {
          const breakMinutes = differenceInMinutes(breakEndTime, breakStartTime);
          totalMinutes -= breakMinutes;
        }
      }
    }

    // Ensure we don't return negative duration
    totalMinutes = Math.max(0, totalMinutes);

    return minutesToTimeString(totalMinutes);
  } catch (error) {
    console.error('Error calculating total work hours:', error);
    return '';
  }
};

/**
 * Get the current date in YYYY-MM-DD format
 * @returns {string} Current date
 */
export const getCurrentDate = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

/**
 * Calculate night work hours (work done after 22:00)
 * @param {string} startTime - Start time in 'HH:mm' format
 * @param {string} endTime - End time in 'HH:mm' format
 * @returns {string} Night work hours in 'HH:mm' format
 */
export const calculateNightWorkHours = (startTime, endTime) => {
  if (!startTime || !endTime) return '';

  try {
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    if (!start || !end) return '';

    // Night hours start at 22:00
    const nightStart = new Date(start);
    nightStart.setHours(22, 0, 0, 0);

    // If end time is before night hours, there are no night hours
    if (end < nightStart) return '00:00';

    // If start time is after night hours, all hours are night hours
    const actualStart = start > nightStart ? start : nightStart;

    const nightMinutes = differenceInMinutes(end, actualStart);

    // Ensure we don't return negative duration
    const adjustedNightMinutes = Math.max(0, nightMinutes);

    return minutesToTimeString(adjustedNightMinutes);
  } catch (error) {
    console.error('Error calculating night work hours:', error);
    return '';
  }
};
