import { useEffect, useState } from 'react';
import { useDataManager } from '../hooks/useDataManager';
import FilterTask from '../adminComponents/filterTask';
import TaskStatsTable from '../adminComponents/TaskStatsTable';
import { useDispatch, useSelector } from 'react-redux';
import { TASKSTART_DATE_REQUEST, TASKSTART_MONTH_REQUEST, TASKSTART_YEAR_REQUEST } from '../reducers/taskStart';
import { PROCESS_LIST_REQUEST } from '../reducers/process';

const TaskStatsPage = () => {
  const {
    sortConfig,
    setSorting,
   
  } = useDataManager();

  const { processLists } = useSelector((state) => state.process);
  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [taskName, setTaskName] = useState(null);

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


  const dispatch = useDispatch();

  useEffect(() => {
    if (filterType === "date" && startDate && endDate) {
      handleDate();
    } else if (filterType === "month" && year && month) {
      handleMonth();
    } else if (filterType === "year" && year) {
      handleYear();
    } else {
      handleProcessLists();
    }
  }, [year, month, startDate, endDate]);


  const handleTaskTypeSelect = (type, process_name) => {
    setSelectedTaskType(type === selectedTaskType ? null : type);
    setTaskName(process_name);
  };

  const { taskStartFilterData } = useSelector((state) => state.taskStart);

  const filteredByTaskType = selectedTaskType
    && taskStartFilterData ? taskStartFilterData.filter(record => String(record.process?.process_code) === String(selectedTaskType))
    : taskStartFilterData;

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">업무 통계</h1>
          <p className="text-gray-600 mt-1">
            직원들의 업무 수행 기록과 효율성을 분석합니다
          </p>
        </div>
      </div>
      <FilterTask
        setFilterType={setFilterType}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMonth={setMonth}
        setYear={setYear}
      />
      <div className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-3">업무 유형 선택</h3>
          <div className="flex flex-wrap gap-2">
            {processLists?.map((process, index) => (
              <button
                key={index}
                onClick={() => handleTaskTypeSelect(process.process_code, process.process_name)}
                className={`px-3 py-1 rounded text-sm ${selectedTaskType === process.process_code
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
      <div className="mb-6">
        <TaskStatsTable
          onSort={setSorting}
          sortConfig={sortConfig}

          taskName={taskName}
          filteredByTaskType={filteredByTaskType}
        />
      </div>
    </div>
  );
};

export default TaskStatsPage;
