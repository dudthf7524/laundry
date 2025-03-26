import { useEffect, useState } from 'react';
import { useDataManager } from '../hooks/useDataManager';
import FilterControls from '../components copy/FilterControls';
import TaskStatsTable from '../components copy/TaskStatsTable';
import StatisticsChart from '../components copy/StatisticsChart';
import { taskTypes } from '../data/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { TASKSTART_DATE_REQUEST, TASKSTART_MONTH_REQUEST, TASKSTART_YEAR_REQUEST } from '../reducers/taskStart';
import { PROCESS_LIST_REQUEST } from '../reducers/process';

const TaskStatsPage = () => {
  const {
    dateRangeFilter,
    monthFilter,
    yearFilter,
    employeeFilter,
    taskTypeFilter,
    sortConfig,
    filteredTaskRecords,
    taskStats,
    setDateRange,
    // setMonth,
    // setYear,
    setEmployee,
    setTaskType,
    setSorting,
    resetFilters,
  } = useDataManager();

  const { processLists } = useSelector((state) => state.process);
  console.log(processLists)


  const [showChart, setShowChart] = useState(false);
  const [timeFrame, setTimeFrame] = useState('daily');
  const [selectedTaskType, setSelectedTaskType] = useState(null);

  const [filterType, setFilterType] = useState('date'); // 'date', 'month', or 'year'
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  
  const handleProcessLists = async () => {
    dispatch({
      type: PROCESS_LIST_REQUEST,
     
    });
  };

  const handleDate = async () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
    }
    dispatch({
      type: TASKSTART_DATE_REQUEST,
      data: data,
    });
  };

  const handleMonth = async () => {
    const data = {
      year: year,
      month: month,
    }
    dispatch({
      type: TASKSTART_MONTH_REQUEST,
      data: data,
    });
  };

  const handleYear = async () => {
    const data = {
      year: year
    }
    dispatch({
      type: TASKSTART_YEAR_REQUEST,
      data: data,
    });
  };

console.log("사작일", startDate)
console.log("종료일", endDate)
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterType === "date" && startDate && endDate) {
      handleDate();
    } else if (filterType === "month" && year && month) {
      handleMonth();
    } else if (filterType === "year" && year) {
      handleYear();
    } else{
      handleProcessLists();
    }
  }, [year, month, startDate, endDate]);


  const handleShowChart = () => {
    setShowChart(!showChart);
  };

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  const handleTaskTypeSelect = (type) => {
    setSelectedTaskType(type === selectedTaskType ? null : type);
    setTaskType(type === selectedTaskType ? null : type);
  };

  const { taskStartFilterData } = useSelector((state) => state.taskStart);
  
  console.log(selectedTaskType)

  console.log(taskStartFilterData)


  const filteredByTaskType = selectedTaskType 
  && taskStartFilterData? taskStartFilterData.filter(record => String(record.process?.process_code) === String(selectedTaskType))
  : taskStartFilterData;
  console.log(filteredByTaskType)


  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">업무 통계</h1>
          <p className="text-gray-600 mt-1">
            직원들의 업무 수행 기록과 효율성을 분석합니다
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
         setFilterType = {setFilterType}
         setStartDate = {setStartDate}
         setEndDate = {setEndDate}
         setMonth = {setMonth}
         setYear = {setYear}
      />

      {/* Task type selection buttons */}
      <div className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-3">업무 유형 선택</h3>
          <div className="flex flex-wrap gap-2">
            {processLists?.map((process ,index) => (
              <button
                key={index}
                onClick={() => handleTaskTypeSelect(process.process_code)}
                className={`px-3 py-1 rounded text-sm ${
                  selectedTaskType === process.process_code
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {process.process_name}
              </button>
            ))}
            {selectedTaskType && (
              <button
                onClick={() => handleTaskTypeSelect(null)}
                className="px-3 py-1 rounded text-sm bg-red-100 text-red-700 hover:bg-red-200"
              >
                선택 초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {showChart && (
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex mb-4 space-x-2">
              <button
                className={`px-3 py-1 rounded text-sm ${
                  timeFrame === 'daily'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleTimeFrameChange('daily')}
              >
                일별
              </button>
              <button
                className={`px-3 py-1 rounded text-sm ${
                  timeFrame === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleTimeFrameChange('monthly')}
              >
                월별
              </button>
              <button
                className={`px-3 py-1 rounded text-sm ${
                  timeFrame === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleTimeFrameChange('yearly')}
              >
                연도별
              </button>
            </div>

            <StatisticsChart
              // taskData={filteredByTaskType}
              type="task"
              timeFrame={timeFrame}
            />
          </div>
        </div>
      )}

      <div className="mb-6">
        <TaskStatsTable
          // records={filteredByTaskType}
          onSort={setSorting}
          sortConfig={sortConfig}
          taskType={selectedTaskType}
          filteredByTaskType={filteredByTaskType}
        />
      </div>

      {/* Task type statistics summary */}
      {/* {taskStats.taskTypeStats && taskStats.taskTypeStats.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">업무 유형별 통계</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    업무 유형
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업 수
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    총 처리 항목
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    총 소요 시간
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    항목당 평균 시간
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {taskStats.taskTypeStats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium">{stat.taskType}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{stat.records}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{stat.totalItems}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{stat.totalDuration}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{stat.averageTimePerItem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TaskStatsPage;
