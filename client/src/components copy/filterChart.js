import { useEffect, useState } from 'react';
import { employees } from '../data/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { ATTENDANCESTART_DATE_REQUEST, ATTENDANCESTART_MONTH_REQUEST, ATTENDANCESTART_YEAR_REQUEST } from '../reducers/attendanceStart';
import { USER_LIST_REQUEST } from '../reducers/user';

const FilterChart = ({
  setFilterType,
  setStartDate,
  setEndDate,
  setMonth,
  setYear,
  setUser,
  setStartYear,
  setEndYear,
  setStartMonth,
  setEndMonth,

  // setFilterType, 
}) => {
  const [filterType, setFilterTypess] = useState('date'); // 'date', 'month', or 'year'

  const roleTypes = [...new Set(employees.map(emp => emp.role))];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i);
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

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate)
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate)
  };
  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth)

  };
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear)
  };



  const handleStartYearChange = (e) => {
    const selectedYear = e.target.value;
    setStartYear(selectedYear)
  };

  const handleEndYearChange = (e) => {
    const selectedYear = e.target.value;
    setEndYear(selectedYear)
  };

  const handleStartMonthChange = (e) => {
    const selectedYear = e.target.value;
    setStartMonth(selectedYear)
  };

  const handleEndMonthChange = (e) => {
    const selectedYear = e.target.value;
    setEndMonth(selectedYear)
  };

  const handleNameChange = (e) => {
    const selectedUser = e.target.value;
    setUser(selectedUser)
  };
  const handleFilterTypeChange = (type) => {

    setFilterType(type);
    setFilterTypess(type)
    setStartDate(null)
    setEndDate(null)
    setMonth(null)
    setYear(null)
  };

  const dispatch = useDispatch();


  useEffect(() => {
    userList();
  }, []);
  const userList = async () => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
  };

  const { userLists } = useSelector((state) => state.user) || { userLists: [] };


  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          className={`px-3 py-1 rounded text-sm ${filterType === 'date'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          onClick={() => handleFilterTypeChange('date')}
        >
          일별 조회
        </button>
        <button
          className={`px-3 py-1 rounded text-sm ${filterType === 'month'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          onClick={() => handleFilterTypeChange('month')}
        >
          월별 조회
        </button>
        <button
          className={`px-3 py-1 rounded text-sm ${filterType === 'year'
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
              // value={dateRangeFilter.startDate || ''}
              onChange={handleStartDateChange}
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
              // value={dateRangeFilter.endDate || ''}
              onChange={handleEndDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {/* <div>
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
              직원
            </label>
            <select
              name="user_code"
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-5"
            >
              <option value="">직원을 선택하세요</option>
              {userLists?.map((user) => (
                <option key={user.user_code} value={user.user_code}>
                  {user.user_name}
                </option>
              ))}
            </select>
          </div> */}
          {/* <div>
            <label htmlFor="roleType" className="block text-sm font-medium text-gray-700 mb-1">
              직무형태
            </label>
            <select
              id="roleType"
              // value={roleTypeFilter || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">전체 직무</option>
              {roleTypes.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div> */}
          {/* {showTaskTypeFilter && (
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
          )} */}
        </form>
      )}

      {filterType === 'month' && (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="yearForMonth" className="block text-sm font-medium text-gray-700 mb-1">
              시작 연도
            </label>
            <select
              id="yearForMonth"
              name="yearForMonth"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleStartYearChange}
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
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
              시작 월
            </label>
            <select
              id="month"
              name="month"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleStartMonthChange}
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
            <label htmlFor="yearForMonth" className="block text-sm font-medium text-gray-700 mb-1">
              종료 연도
            </label>
            <select
              id="yearForMonth"
              name="yearForMonth"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleEndYearChange}
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
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
              종료 월
            </label>
            <select
              id="month"
              name="month"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleEndMonthChange}
            >
              <option value="">월 선택</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label htmlFor="employeeMonth" className="block text-sm font-medium text-gray-700 mb-1">
              직원
            </label>
            <select
              id="employeeMonth"
              // value={employeeFilter || ''}
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
              // value={roleTypeFilter || ''}
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
          </div> */}
          {/* {showTaskTypeFilter && (
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
          )} */}
        </form>
      )}

      {filterType === 'year' && (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              시작 연도
            </label>
            <select
              id="year"
              name="year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleStartYearChange}
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
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              종료 연도
            </label>
            <select
              id="year"
              name="year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleEndYearChange}
            >
              <option value="">연도 선택</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label htmlFor="employeeYear" className="block text-sm font-medium text-gray-700 mb-1">
              직원
            </label>
            <select
              id="employeeYear"
              // value={employeeFilter || ''}
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
              // value={roleTypeFilter || ''}
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
          </div> */}
          {/* {showTaskTypeFilter && (
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
          )} */}
        </form>
      )}

      <div className="mt-4 flex justify-end">
        <button
          // onClick={onResetFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          필터 초기화
        </button>
      </div>
    </div>
  );
};

export default FilterChart;
