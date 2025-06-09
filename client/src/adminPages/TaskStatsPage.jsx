import { useEffect, useState } from 'react';
import FilterTask from '../adminComponents/filterTask';
import TaskStatsTable from '../adminComponents/TaskStatsTable';
import { useDispatch, useSelector } from 'react-redux';
import { TASKSTART_DATE_REQUEST, TASKSTART_MONTH_REQUEST, TASKSTART_UPDATE_REQUEST, TASKSTART_YEAR_REQUEST } from '../reducers/taskStart';
import { PROCESS_LIST_REQUEST } from '../reducers/process';
import { format } from 'date-fns';
import { TASKEND_REGISTER_ADMIN_REQUEST } from '../reducers/taskEnd';

const TaskStatsPage = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const { processLists } = useSelector((state) => state.process);
  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [taskName, setTaskName] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filterType, setFilterType] = useState('date');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [isCheckoutOnlyModalOpen, setIsCheckoutOnlyModalOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleTimeChange = (field, value, type) => {
    const [hour, minute] = (editData[field] || "00:00").split(":");
    const newTime = type === 'hour' ? `${value}:${minute}` : `${hour}:${value}`;

    setEditData((prev) => ({
      ...prev,
      [field]: newTime,
    }));
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
    }
  }, [year, month, startDate, endDate]);

  useEffect(() => {
    handleProcessLists();
  }, []);

  const handleProcessLists = async () => {
    dispatch({
      type: PROCESS_LIST_REQUEST,
    });
  };

  const handleTaskTypeSelect = (type, process_name) => {
    setSelectedTaskType(type === selectedTaskType ? null : type);
    setTaskName(process_name);
  };

  const { taskStartFilterData } = useSelector((state) => state.taskStart);

  const filteredByTaskType = selectedTaskType
    && taskStartFilterData ? taskStartFilterData.filter(record => String(record.process?.process_code) === String(selectedTaskType))
    : taskStartFilterData;

  const handleEditClick = () => {
    if (selected) {
      setEditData({ ...selected });

      if (!selected.task_end_date || !selected.task_end_time) {
        setIsCheckoutOnlyModalOpen(true)
      } else {
        setIsModalOpen(true);
      }
    }

    // if (selected) {
    //   setEditData({ ...selected });
    //   setIsModalOpen(true);
    // } else {
    //   alert("수정할 항목을 선택해주세요.");
    // }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch({
      type: TASKSTART_UPDATE_REQUEST,
      data: editData,
    });

    setIsModalOpen(false);
  };

  const handleSaveInsert = () => {
    console.log(editData)
    dispatch({
      type: TASKEND_REGISTER_ADMIN_REQUEST,
      data: editData,
    });

    setIsCheckoutOnlyModalOpen(false);
  };
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
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMonth={setMonth}
        setYear={setYear}
        handleEditClick={handleEditClick}
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
          taskName={taskName}
          filteredByTaskType={filteredByTaskType}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-4/5 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">업무 정보 수정</h2>

            <label>이름</label>
            <input type="text" readOnly value={editData.user_name} className="border p-2 w-full mb-2" />

            <label>직무형태</label>
            <input type="text" readOnly value={editData.user_position} className="border p-2 w-full mb-2" />

            <label>업무 시작 날짜</label>
            <input type="date" name="task_start_date" value={editData.task_start_date} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            <label>시작 시간</label>
            <div className="flex gap-2 mb-2">
              <select
                value={editData.task_start_time?.split(':')[0] || '00'}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    task_start_time: `${e.target.value}:${prev.task_start_time?.split(':')[1] || '00'}`,
                  }))
                }
                className="border p-2 w-1/2"
              >
                {[...Array(24)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, '0')}>
                    {String(i).padStart(2, '0')}
                  </option>
                ))}
              </select>
              :
              <select
                value={editData.task_start_time?.split(':')[1] || '00'}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    task_start_time: `${prev.task_start_time?.split(':')[0] || '00'}:${e.target.value}`,
                  }))
                }
                className="border p-2 w-1/2"
              >
                {[...Array(60)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, '0')}>
                    {String(i).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <label>업무 종료 날짜</label>
            <input type="date" name="task_end_date" value={editData.task_end_date || ""} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            <label>종료 시간</label>
            <div className="flex gap-2 mb-2">
              <select
                value={editData.task_end_time?.split(':')[0] || '00'}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    task_end_time: `${e.target.value}:${prev.task_end_time?.split(':')[1] || '00'}`,
                  }))
                }
                className="border p-2 w-1/2"
              >
                {[...Array(24)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, '0')}>
                    {String(i).padStart(2, '0')}
                  </option>
                ))}
              </select>
              :
              <select
                value={editData.task_end_time?.split(':')[1] || '00'}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    task_end_time: `${prev.task_end_time?.split(':')[0] || '00'}:${e.target.value}`,
                  }))
                }
                className="border p-2 w-1/2"
              >
                {[...Array(60)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, '0')}>
                    {String(i).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <label>개수</label>
            <input type="number" name="total_count" value={editData.total_count || ""} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            <button onClick={handleSave} className="w-full bg-blue-500 text-white px-4 py-2 rounded text-center">
              저장
            </button>
            <button onClick={() => setIsModalOpen(false)} className="w-full bg-gray-300 text-black px-4 py-2 rounded text-center mt-2">
              취소
            </button>
          </div>
        </div>
      )}

      {isCheckoutOnlyModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-4/5 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">업무 정보 수정</h2>

            <label>이름</label>
            <input type="text" readOnly value={editData.user_name} className="border p-2 w-full mb-2" />

            <label>직무형태</label>
            <input type="text" readOnly value={editData.user_position} className="border p-2 w-full mb-2" />

            <label>업무 종료 날짜</label>
            <input type="date" name="task_end_date" value={editData.task_end_date || ""} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            <label>종료 시간</label>
            <div className="flex gap-2 mb-2">
              <select
                value={editData.task_end_time?.split(':')[0] || '00'}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    task_end_time: `${e.target.value}:${prev.task_end_time?.split(':')[1] || '00'}`,
                  }))
                }
                className="border p-2 w-1/2"
              >
                {[...Array(24)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, '0')}>
                    {String(i).padStart(2, '0')}
                  </option>
                ))}
              </select>
              :
              <select
                value={editData.task_end_time?.split(':')[1] || '00'}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    task_end_time: `${prev.task_end_time?.split(':')[0] || '00'}:${e.target.value}`,
                  }))
                }
                className="border p-2 w-1/2"
              >
                {[...Array(60)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, '0')}>
                    {String(i).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <label>개수</label>
            <input type="number" name="total_count" value={editData.total_count || ""} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            <button onClick={handleSaveInsert} className="w-full bg-blue-500 text-white px-4 py-2 rounded text-center">
              저장
            </button>
            <button onClick={() => setIsCheckoutOnlyModalOpen(false)} className="w-full bg-gray-300 text-black px-4 py-2 rounded text-center mt-2">
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStatsPage;
