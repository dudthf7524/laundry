import { parse, isWithinInterval, parseISO, isSameMonth, isSameYear } from 'date-fns';

/**
 * Filter attendance records by date range
 * @param {Array} records - Attendance records to filter
 * @param {string} startDate - Start date in 'YYYY-MM-DD' format
 * @param {string} endDate - End date in 'YYYY-MM-DD' format
 * @returns {Array} Filtered records
 */
export const filterByDateRange = (records, startDate, endDate) => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  if (!startDate || !endDate) {
    return records;
  }

  try {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    return records.filter(record => {
      const recordDate = parseISO(record.date);
      return isWithinInterval(recordDate, { start, end });
    });
  } catch (error) {
    console.error('Error filtering by date range:', error);
    return records;
  }
};

/**
 * Filter records by month
 * @param {Array} records - Records to filter
 * @param {string} yearMonth - Year and month in 'YYYY-MM' format
 * @returns {Array} Filtered records
 */
export const filterByMonth = (records, yearMonth) => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  if (!yearMonth) {
    return records;
  }

  try {
    const [year, month] = yearMonth.split('-').map(Number);
    const targetDate = new Date(year, month - 1); // Month is 0-indexed in JS Date

    return records.filter(record => {
      const recordDate = parseISO(record.date);
      return isSameMonth(recordDate, targetDate) && isSameYear(recordDate, targetDate);
    });
  } catch (error) {
    console.error('Error filtering by month:', error);
    return records;
  }
};

/**
 * Filter records by year
 * @param {Array} records - Records to filter
 * @param {number} year - Year to filter by
 * @returns {Array} Filtered records
 */
export const filterByYear = (records, year) => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  if (!year) {
    return records;
  }

  try {
    const targetDate = new Date(year, 0); // January 1st of the target year

    return records.filter(record => {
      const recordDate = parseISO(record.date);
      return isSameYear(recordDate, targetDate);
    });
  } catch (error) {
    console.error('Error filtering by year:', error);
    return records;
  }
};

/**
 * Filter records by employee
 * @param {Array} records - Records to filter
 * @param {number} employeeId - Employee ID to filter by
 * @returns {Array} Filtered records
 */
export const filterByEmployee = (records, employeeId) => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  if (!employeeId) {
    return records;
  }

  return records.filter(record => record.employeeId === employeeId);
};

/**
 * Filter records by role type
 * @param {Array} records - Records to filter
 * @param {string} roleType - Role type to filter by
 * @returns {Array} Filtered records
 */
export const filterByRoleType = (records, roleType) => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  if (!roleType) {
    return records;
  }

  return records.filter(record => record.roleType === roleType);
};

/**
 * Sort records by a specified field
 * @param {Array} records - Records to sort
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} Sorted records
 */
export const sortRecords = (records, field, direction = 'asc') => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  if (!field) {
    return records;
  }

  const sortOrder = direction === 'desc' ? -1 : 1;

  return [...records].sort((a, b) => {
    // Handle different field types
    if (field.includes('Time') || field.includes('time')) {
      // Sort time strings
      const aTime = a[field] || '';
      const bTime = b[field] || '';

      if (!aTime && !bTime) return 0;
      if (!aTime) return sortOrder;
      if (!bTime) return -sortOrder;

      const [aHours, aMinutes] = aTime.split(':').map(Number);
      const [bHours, bMinutes] = bTime.split(':').map(Number);

      const aTotalMinutes = aHours * 60 + aMinutes;
      const bTotalMinutes = bHours * 60 + bMinutes;

      return sortOrder * (aTotalMinutes - bTotalMinutes);
    }
    else if (field === 'date') {
      // Sort dates
      const aDate = a[field] ? new Date(a[field]) : null;
      const bDate = b[field] ? new Date(b[field]) : null;

      if (!aDate && !bDate) return 0;
      if (!aDate) return sortOrder;
      if (!bDate) return -sortOrder;

      return sortOrder * (aDate - bDate);
    }
    else if (field === 'count' || field.includes('Hours') || field.includes('hours')) {
      // Sort numbers
      const aVal = a[field] || 0;
      const bVal = b[field] || 0;

      return sortOrder * (aVal - bVal);
    }
    else {
      // Sort strings
      const aVal = a[field] || '';
      const bVal = b[field] || '';

      return sortOrder * aVal.localeCompare(bVal);
    }
  });
};

/**
 * Filter task records by task type
 * @param {Array} records - Records to filter
 * @param {string} taskType - Task type to filter by
 * @returns {Array} Filtered records
 */
export const filterByTaskType = (records, taskType) => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  if (!taskType) {
    return records;
  }

  return records.filter(record => record.taskType === taskType);
};
