import { useState } from 'react';
import { useDataManager } from '../hooks/useDataManager';

import FilterControls from '../components copy/FilterControls';
import AttendanceTable from '../components copy/AttendanceTable';
import StatisticsChart from '../components copy/StatisticsChart';
import { useSelector } from 'react-redux';
import Chart from './chart';

const AttendancePage = () => {

  const {
    dateRangeFilter,
    monthFilter,
    yearFilter,
    employeeFilter,
    roleTypeFilter,
    sortConfig,
    filteredAttendanceRecords,
    attendanceStats,
    setDateRange,
    setMonth,
    setYear,
    setEmployee,
    setRoleType,
    setSorting,
    resetFilters,
  } = useDataManager();


  const [showChart, setShowChart] = useState(false);
  const [timeFrame, setTimeFrame] = useState('daily');

  const handleShowChart = () => {
    setShowChart(!showChart);
  };

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };
  const { attendanceStartYear } = useSelector((state) => state.attendanceStart);

  const attendanceStartYearSum = attendanceStartYear? attendanceStartYear.length : 0;

  const countNullEnd = Array.isArray(attendanceStartYear)
    ? attendanceStartYear.filter(asy => asy.attendance_end === null).length
    : 0;

  const countLate = Array.isArray(attendanceStartYear)
    ? attendanceStartYear.filter(asy => asy.attendance_start_state === "지각").length
    : 0;

    return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">근태 관리</h1>
          <p className="text-gray-600 mt-1">
            직원들의 근태 기록을 조회하고 관리합니다
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleShowChart}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showChart ? '차트 숨기기' : '차트 보기'}
          </button>
        </div>
      </div>

      <FilterControls
      // onDateRangeChange={setDateRange}
      // onMonthChange={setMonth}
      // onYearChange={setYear}
      // onEmployeeChange={setEmployee}
      // onRoleTypeChange={setRoleType}
      // onResetFilters={resetFilters}
      // dateRangeFilter={dateRangeFilter}
      // monthFilter={monthFilter}
      // yearFilter={yearFilter}
      // employeeFilter={employeeFilter}
      // roleTypeFilter={roleTypeFilter}
      />



      {showChart && (
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex mb-4 space-x-2">
              <button
                className={`px-3 py-1 rounded text-sm ${timeFrame === 'daily'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                onClick={() => handleTimeFrameChange('daily')}
              >
                일별
              </button>
              <button
                className={`px-3 py-1 rounded text-sm ${timeFrame === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                onClick={() => handleTimeFrameChange('monthly')}
              >
                월별
              </button>
              <button
                className={`px-3 py-1 rounded text-sm ${timeFrame === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                onClick={() => handleTimeFrameChange('yearly')}
              >
                연도별
              </button>
            </div>

            {/* <StatisticsChart
              attendanceData={filteredAttendanceRecords}
              type="attendance"
              timeFrame={timeFrame}
            /> */}

            <Chart/>
          </div>
        </div>
      )}

      <div className="mb-6">
        <AttendanceTable />
      </div>


      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">근태 요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <div className="text-sm font-medium text-blue-500">총 근태 기록</div>
            <div className="mt-1 text-2xl font-semibold">{attendanceStartYearSum}건</div>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <div className="text-sm font-medium text-green-500">정상 출근</div>
            <div className="mt-1 text-2xl font-semibold">
              {attendanceStartYearSum - countNullEnd}건
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <div className="text-sm font-medium text-yellow-500">근무중</div>
            <div className="mt-1 text-2xl font-semibold">
              {countNullEnd}건
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded">
            <div className="text-sm font-medium text-red-500">지각</div>
            <div className="mt-1 text-2xl font-semibold">
              {countLate}건
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
