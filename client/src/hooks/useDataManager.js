import { useState, useCallback, useMemo } from 'react';
import { attendanceRecords, taskRecords } from '../data/mockData';
import {
  filterByDateRange,
  filterByMonth,
  filterByYear,
  filterByEmployee,
  filterByRoleType,
  filterByTaskType,
  sortRecords
} from '../utils/filterUtils';

import { calculateTotalWorkHours, calculateNightWorkHours } from '../utils/dateUtils';

/**
 * Custom hook for managing attendance and task data
 */
export const useDataManager = () => {
  // State for filtering
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: null, endDate: null });
  const [monthFilter, setMonthFilter] = useState(null);
  const [yearFilter, setYearFilter] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState(null);
  const [roleTypeFilter, setRoleTypeFilter] = useState(null);
  const [taskTypeFilter, setTaskTypeFilter] = useState(null);

  // State for sorting
  const [sortConfig, setSortConfig] = useState({ field: 'date', direction: 'asc' });

  // Filtered and sorted attendance records
  const filteredAttendanceRecords = useMemo(() => {
    let filtered = [...attendanceRecords];

    // Apply filters
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      filtered = filterByDateRange(filtered, dateRangeFilter.startDate, dateRangeFilter.endDate);
    } else if (monthFilter) {
      filtered = filterByMonth(filtered, monthFilter);
    } else if (yearFilter) {
      filtered = filterByYear(filtered, yearFilter);
    }

    if (employeeFilter) {
      filtered = filterByEmployee(filtered, employeeFilter);
    }

    if (roleTypeFilter) {
      filtered = filterByRoleType(filtered, roleTypeFilter);
    }

    // Sort the filtered records
    filtered = sortRecords(filtered, sortConfig.field, sortConfig.direction);

    return filtered;
  }, [attendanceRecords, dateRangeFilter, monthFilter, yearFilter, employeeFilter, roleTypeFilter, sortConfig]);

  // Filtered and sorted task records
  const filteredTaskRecords = useMemo(() => {
    let filtered = [...taskRecords];

    // Apply filters
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      filtered = filterByDateRange(filtered, dateRangeFilter.startDate, dateRangeFilter.endDate);
    } else if (monthFilter) {
      filtered = filterByMonth(filtered, monthFilter);
    } else if (yearFilter) {
      filtered = filterByYear(filtered, yearFilter);
    }

    if (employeeFilter) {
      filtered = filterByEmployee(filtered, employeeFilter);
    }

    if (taskTypeFilter) {
      filtered = filterByTaskType(filtered, taskTypeFilter);
    }

    // Sort the filtered records
    filtered = sortRecords(filtered, sortConfig.field, sortConfig.direction);

    return filtered;
  }, [taskRecords, dateRangeFilter, monthFilter, yearFilter, employeeFilter, taskTypeFilter, sortConfig]);

  // Calculate statistics for attendance records
  const attendanceStats = useMemo(() => {
    const totalRecords = filteredAttendanceRecords.length;

    // Calculate total work hours
    let totalWorkHours = 0;
    let totalNightHours = 0;
    let totalLateHours = 0;
    let totalOvertimeHours = 0;

    filteredAttendanceRecords.forEach(record => {
      // You would implement the calculation logic here based on your requirements
      // For this example, we'll just add placeholders
    });

    return {
      totalRecords,
      totalWorkHours,
      totalNightHours,
      totalLateHours,
      totalOvertimeHours
    };
  }, [filteredAttendanceRecords]);

  // Calculate statistics for task records
  const taskStats = useMemo(() => {
    const totalRecords = filteredTaskRecords.length;

    // Group by task type
    const byTaskType = filteredTaskRecords.reduce((acc, record) => {
      const type = record.taskType;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(record);
      return acc;
    }, {});

    // Calculate stats for each task type
    const taskTypeStats = Object.entries(byTaskType).map(([type, records]) => {
      const totalItems = records.reduce((sum, record) => sum + record.count, 0);
      const totalDuration = records.reduce((sum, record) => {
        const [hours, minutes] = record.totalDuration.split(':').map(Number);
        return sum + (hours * 60 + minutes);
      }, 0);

      const averageTimePerItem = totalItems > 0 ? totalDuration / totalItems : 0;

      return {
        taskType: type,
        records: records.length,
        totalItems,
        totalDuration: Math.floor(totalDuration / 60) + ':' + (totalDuration % 60).toString().padStart(2, '0'),
        averageTimePerItem: Math.floor(averageTimePerItem / 60) + ':' +
                          (averageTimePerItem % 60).toFixed(2).padStart(5, '0')
      };
    });

    return {
      totalRecords,
      taskTypeStats
    };
  }, [filteredTaskRecords]);

  // Handler functions for filters
  const setDateRange = useCallback((startDate, endDate) => {
    setDateRangeFilter({ startDate, endDate });
    setMonthFilter(null);
    setYearFilter(null);
  }, []);

  const setMonth = useCallback((yearMonth) => {
    setMonthFilter(yearMonth);
    setDateRangeFilter({ startDate: null, endDate: null });
    setYearFilter(null);
  }, []);

  const setYear = useCallback((year) => {
    setYearFilter(year);
    setDateRangeFilter({ startDate: null, endDate: null });
    setMonthFilter(null);
  }, []);

  const setEmployee = useCallback((employeeId) => {
    setEmployeeFilter(employeeId);
  }, []);

  const setRoleType = useCallback((roleType) => {
    setRoleTypeFilter(roleType);
  }, []);

  const setTaskType = useCallback((taskType) => {
    setTaskTypeFilter(taskType);
  }, []);

  // Handler for sorting
  const setSorting = useCallback((field) => {
    setSortConfig(prevConfig => {
      // If clicking on the same field, toggle the direction
      if (prevConfig.field === field) {
        return {
          field,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      }

      // Default to ascending for new field
      return {
        field,
        direction: 'asc'
      };
    });
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setDateRangeFilter({ startDate: null, endDate: null });
    setMonthFilter(null);
    setYearFilter(null);
    setEmployeeFilter(null);
    setRoleTypeFilter(null);
    setTaskTypeFilter(null);
    setSortConfig({ field: 'date', direction: 'asc' });
  }, []);

  return {
    // Filter states
    dateRangeFilter,
    monthFilter,
    yearFilter,
    employeeFilter,
    roleTypeFilter,
    taskTypeFilter,
    sortConfig,

    // Filtered data
    filteredAttendanceRecords,
    filteredTaskRecords,

    // Statistics
    attendanceStats,
    taskStats,

    // Handler functions
    setDateRange,
    setMonth,
    setYear,
    setEmployee,
    setRoleType,
    setTaskType,
    setSorting,
    resetFilters
  };
};
