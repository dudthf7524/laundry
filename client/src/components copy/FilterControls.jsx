import { useState } from 'react';
import { employees } from '../data/mockData';

const FilterControls = ({
  onDateRangeChange,
  onMonthChange,
  onYearChange,
  onEmployeeChange,
  onRoleTypeChange,
  onTaskTypeChange,
  taskTypes,
  onResetFilters,
  dateRangeFilter,
  monthFilter,
  yearFilter,
  employeeFilter,
  roleTypeFilter,
  taskTypeFilter,
  showTaskTypeFilter = false,
}) => {
  const [filterType, setFilterType] = useState('date'); // 'date', 'month', or 'year'

  // Extract unique role types from employees
  const roleTypes = [...new Set(employees.map(emp => emp.role))];

  // Get years from 2020 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i);

  // Get months for the month selector
  const months = [
    { value: '01', label: '1월' },
    { value: '02', label: '2월' },
    { value: '03', label: '3월' },
    { value: '04', label: '4월' },
    { value: '05', label: '5월' },
    { value: '06', label: '6월' },
    { value: '07', label: '7월' },
    { value: '08', label: '8월' },
    { value: '09', label: '9월' },
    { value: '10', label: '10월' },
    { value: '11', label: '11월' },
    { value: '12', label: '12월' },
  ];

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate' || name === 'endDate') {
      onDateRangeChange(
        name === 'startDate' ? value : dateRangeFilter.startDate,
        name === 'endDate' ? value : dateRangeFilter.endDate
      );
    }
  };

  const handleMonthChange = (e) => {
    const selectedYear = e.target.form.yearForMonth.value;
    const selectedMonth = e.target.value;

    if (selectedYear && selectedMonth) {
      onMonthChange(`${selectedYear}-${selectedMonth}`);
    }
  };

  const handleYearChange = (e) => {
    onYearChange(e.target.value);
  };

  const handleEmployeeChange = (e) => {
    onEmployeeChange(e.target.value ? parseInt(e.target.value) : null);
  };

  const handleRoleTypeChange = (e) => {
    onRoleTypeChange(e.target.value || null);
  };

  const handleTaskTypeChange = (e) => {
    onTaskTypeChange(e.target.value || null);
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    onResetFilters();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          className={`px-3 py-1 rounded text-sm ${
            filterType === 'date'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleFilterTypeChange('date')}
        >
          일별 조회
        </button>
        <button
          className={`px-3 py-1 rounded text-sm ${
            filterType === 'month'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleFilterTypeChange('month')}
        >
          월별 조회
        </button>
        <button
          className={`px-3 py-1 rounded text-sm ${
            filterType === 'year'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleFilterTypeChange('year')}
        >
          연도별 조회
        </button>
      </div>

      {filterType === 'date' && (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              시작 날짜
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={dateRangeFilter.startDate || ''}
              onChange={handleDateRangeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              종료 날짜
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={dateRangeFilter.endDate || ''}
              onChange={handleDateRangeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
              직원
            </label>
            <select
              id="employee"
              value={employeeFilter || ''}
              onChange={handleEmployeeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">전체 직원</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} ({employee.nickname}) - {employee.role}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="roleType" className="block text-sm font-medium text-gray-700 mb-1">
              직무형태
            </label>
            <select
              id="roleType"
              value={roleTypeFilter || ''}
              onChange={handleRoleTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">전체 직무</option>
              {roleTypes.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          {showTaskTypeFilter && (
            <div>
              <label htmlFor="taskType" className="block text-sm font-medium text-gray-700 mb-1">
                업무 유형
              </label>
              <select
                id="taskType"
                value={taskTypeFilter || ''}
                onChange={handleTaskTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">전체 업무</option>
                {taskTypes.map((task) => (
                  <option key={task} value={task}>
                    {task}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>
      )}

      {filterType === 'month' && (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="yearForMonth" className="block text-sm font-medium text-gray-700 mb-1">
              연도
            </label>
            <select
              id="yearForMonth"
              name="yearForMonth"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue={currentYear}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
              월
            </label>
            <select
              id="month"
              name="month"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleMonthChange}
            >
              <option value="">월 선택</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="employeeMonth" className="block text-sm font-medium text-gray-700 mb-1">
              직원
            </label>
            <select
              id="employeeMonth"
              value={employeeFilter || ''}
              onChange={handleEmployeeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">전체 직원</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} ({employee.nickname}) - {employee.role}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="roleTypeMonth" className="block text-sm font-medium text-gray-700 mb-1">
              직무형태
            </label>
            <select
              id="roleTypeMonth"
              value={roleTypeFilter || ''}
              onChange={handleRoleTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">전체 직무</option>
              {roleTypes.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          {showTaskTypeFilter && (
            <div>
              <label htmlFor="taskTypeMonth" className="block text-sm font-medium text-gray-700 mb-1">
                업무 유형
              </label>
              <select
                id="taskTypeMonth"
                value={taskTypeFilter || ''}
                onChange={handleTaskTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">전체 업무</option>
                {taskTypes.map((task) => (
                  <option key={task} value={task}>
                    {task}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>
      )}

      {filterType === 'year' && (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              연도
            </label>
            <select
              id="year"
              name="year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleYearChange}
            >
              <option value="">연도 선택</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="employeeYear" className="block text-sm font-medium text-gray-700 mb-1">
              직원
            </label>
            <select
              id="employeeYear"
              value={employeeFilter || ''}
              onChange={handleEmployeeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">전체 직원</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} ({employee.nickname}) - {employee.role}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="roleTypeYear" className="block text-sm font-medium text-gray-700 mb-1">
              직무형태
            </label>
            <select
              id="roleTypeYear"
              value={roleTypeFilter || ''}
              onChange={handleRoleTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">전체 직무</option>
              {roleTypes.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          {showTaskTypeFilter && (
            <div>
              <label htmlFor="taskTypeYear" className="block text-sm font-medium text-gray-700 mb-1">
                업무 유형
              </label>
              <select
                id="taskTypeYear"
                value={taskTypeFilter || ''}
                onChange={handleTaskTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">전체 업무</option>
                {taskTypes.map((task) => (
                  <option key={task} value={task}>
                    {task}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          필터 초기화
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
