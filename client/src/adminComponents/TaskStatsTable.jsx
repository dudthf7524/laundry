import { useSelector } from 'react-redux';

const TaskStatsTable = ({ onSort, sortConfig, taskName, filteredByTaskType }) => {
  var { taskStartFilterData } = useSelector((state) => state.taskStart);

  const handleSort = (field) => {
    onSort(field);
  };

  if (taskName) {
    taskStartFilterData = filteredByTaskType;
  }

  console.log(taskStartFilterData)
  const getSortIcon = (field) => {
    if (sortConfig.field !== field) {
      return <span className="text-gray-300">↕</span>;
    }
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  const getComparisonArrow = (comparedToAverage) => {
    switch (comparedToAverage) {
      case 'above':
        return <span className="text-green-500">↑</span>;
      case 'below':
        return <span className="text-red-500">↓</span>;
      case 'average':
        return <span className="text-gray-500">↔</span>;
      default:
        return null;
    }
  };

  const getSortableHeaderClass = (field) => {
    return `px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 ${sortConfig.field === field ? 'bg-gray-50' : ''
      }`;
  };

  const calculateDifference = (actual, expected) => {
    if (actual === null || expected === null) return '업무중'; // 값이 없을 경우
    const difference = (actual - expected).toFixed(2);
    if (difference > 0) {
      return <span className="text-green-500">+{difference}</span>; // 초과 시 초록색
    } else if (difference < 0) {
      return <span className="text-red-500">{difference}</span>; // 부족 시 빨간색
    }
    return <span className="text-gray-500">0</span>; // 동일할 경우
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {taskName ? `${taskName} 업무 통계` : '전체 업무 통계'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          각 직원별 업무 수행 현황
        </p>
      </div>

      <div className="overflow-auto max-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className={getSortableHeaderClass('date')} onClick={() => handleSort('date')}>
                업무 시작 날짜 {getSortIcon('date')}
              </th>
              <th className={getSortableHeaderClass('name')} onClick={() => handleSort('employeeId')}>
                이름(직급)
              </th>
              <th className={getSortableHeaderClass('taskType')} onClick={() => handleSort('taskType')}>
                업무유형
              </th>
              <th className={getSortableHeaderClass('startTime')} onClick={() => handleSort('startTime')}>
                시작 시간
              </th>
              <th className={getSortableHeaderClass('endTime')} onClick={() => handleSort('endTime')}>
                업무 종료 날짜
              </th>
              <th className={getSortableHeaderClass('totalDuration')} onClick={() => handleSort('totalDuration')}>
                종료 시간
              </th>
              <th className={getSortableHeaderClass('count')} onClick={() => handleSort('count')}>
                개수
              </th>
              <th className={getSortableHeaderClass('count')} onClick={() => handleSort('count')}>
                총 소요 시간
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                실제 시간당 개수
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                지정 시간당 개수
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                평균대비
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {taskStartFilterData?.length > 0 ? (
              taskStartFilterData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_start_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.user.user_name}({data.user.user_position})</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.process.process_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_start_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_end?.task_end_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_end?.task_end_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_end?.total_count}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.sum_hour}:{data.sum_minute}</td>
                  <td className="px-4 py-3 whitespace-nowrap ">
                    {data.avg_count_per_hour}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_end?.hour_average}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{calculateDifference(data.avg_count_per_hour, data.task_end?.hour_average)}</td>
                  </tr>
              ))
            ) : (
              <tr>
                <td colSpan={taskName ? 8 : 9} className="px-4 py-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskStatsTable;
