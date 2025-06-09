import { useState } from 'react';
import { useSelector } from 'react-redux';

const TaskStatsTable = ({ taskName, filteredByTaskType, setSelected, selected }) => {
  var { taskStartFilterData } = useSelector((state) => state.taskStart);
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const [searchName, setSearchName] = useState('');
  const baseData = taskName ? filteredByTaskType : taskStartFilterData;

  // 이름 검색까지 같이 적용
  const filteredByName = (baseData || []).filter((item) =>
    item.user.user_name.includes(searchName)
  );

  const getTotalWorkTime = (dataArray) => {
    let totalMinutes = 0;
    dataArray.forEach((item) => {
      const hour = parseInt(item.sum_hour || 0);
      const min = parseInt(item.sum_minute || 0);
      totalMinutes += hour * 60 + min;
    });

    const totalHour = Math.floor(totalMinutes / 60);
    const remainMin = totalMinutes % 60;

    return `${totalHour}시간 ${remainMin}분`;
  };

  // if (taskName) {
  //   taskStartFilterData = filteredByTaskType;
  // }
  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (field) => {
    if (sortConfig.field !== field) {
      return <span className="text-gray-300">↕</span>;
    }
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  const handleCheckboxChange = (data) => {
    console.log(data)
    if (!data.task_end) {
      // alert('업무완료에 대한 데이터가 존재하지 않습니다. 근무자에게 요청해주세요!!')
      // return;
      setSelected({
        user_code: data.user.user_code,
        user_name: data.user.user_name,
        user_position: data.user.user_position,
        task_start_id: data.task_start_id,
        task_start_date: data.task_start_date,
        task_start_time: data.task_start_time,
        hour_average: data.process.hour_average,
        
      });
    } else {
      setSelected({
        user_code: data.user.user_code,
        user_name: data.user.user_name,
        user_position: data.user.user_position,
        task_start_id: data.task_start_id,
        task_start_date: data.task_start_date,
        task_start_time: data.task_start_time,
        task_end_id: data.task_end.task_end_id,
        task_end_date: data.task_end.task_end_date,
        task_end_time: data.task_end.task_end_time,
      });
    }

  };

  // const getComparisonArrow = (comparedToAverage) => {
  //   switch (comparedToAverage) {
  //     case 'above':
  //       return <span className="text-green-500">↑</span>;
  //     case 'below':
  //       return <span className="text-red-500">↓</span>;
  //     case 'average':
  //       return <span className="text-gray-500">↔</span>;
  //     default:
  //       return null;
  //   }
  // };

  const sortedData = [...(filteredByName || [])].sort((a, b) => {
    if (sortConfig.field === 'date') {
      return sortConfig.direction === 'asc'
        ? new Date(a.task_start_date) - new Date(b.task_start_date)
        : new Date(b.task_start_date) - new Date(a.task_start_date);
    }

    if (sortConfig.field === 'name') {
      const aName = a.user.user_name + a.user.user_position;
      const bName = b.user.user_name + b.user.user_position;

      return sortConfig.direction === 'asc'
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    }

    return 0;
  });



  const getSortableHeaderClass = (field) => {
    return `px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 ${sortConfig.field === field ? 'bg-gray-50' : ''
      }`;
  };

  const calculateDifference = (actual, expected) => {
    if (actual === null || expected === null) return '업무중'; // 값이 없을 경우
    const difference = (actual - expected).toFixed(2);
    if (difference > 0) {
      return <span className="text-green-500">{difference} ↑</span>; // 초과 시 초록색
    } else if (difference < 0) {
      return <span className="text-red-500">{difference} ↓</span>; // 부족 시 빨간색
    }
    return <span className="text-gray-500">↔</span>; // 동일할 경우
  };

  const calculatePercentageDifference = (actual, expected) => {
    if (!actual || !expected) return '업무중'; // 값이 없거나 null일 경우 처리

    const percentage = ((actual / expected) * 100).toFixed(1);

    if (percentage > 100) {
      return <span className="text-green-500">{percentage}% ↑</span>; // 초과
    } else if (percentage < 100) {
      return <span className="text-red-500">{percentage}% ↓</span>; // 미달
    }
    return <span className="text-gray-500">100% ↔</span>; // 동일
  };

  // const calculatePercentageDifference = (actual, expected) => {
  //   if (!actual || !expected || expected === 0) return 'N/A';
  //   const percentage = ((actual - expected) / expected) * 100;
  //   const rounded = percentage.toFixed(1);
  //   const colorClass = percentage > 0 ? 'text-green-500' : percentage < 0 ? 'text-red-500' : 'text-gray-500';

  //   return <span className={colorClass}>{rounded}%</span>;
  // };

  const { user } = useSelector((state) => state.user);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="p-4">
        <input
          type="text"
          placeholder="이름으로 검색"
          className="p-2 border rounded w-full "
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        {searchName && (
          <span className="text-sm text-blue-600">
            총 업무 시간: <strong>{getTotalWorkTime(filteredByName)}</strong>
          </span>
        )}
      </div>

      <div className="px-4 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {taskName ? `${taskName} 업무 통계` : '전체 업무 통계'}
        </h3>
        <p className="mt-2 mb-2 max-w-2xl text-sm text-gray-500">
          각 직원별 업무 수행 현황
        </p>
      </div>

      <div className="overflow-auto max-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {
                user?.auth_code === "A1" ?
                  <th className={getSortableHeaderClass('user_name')} onClick={() => handleSort('user_name')}>
                    선택
                  </th> : ''
              }
              <th className={getSortableHeaderClass('date')} onClick={() => handleSort('date')}>
                업무 시작 날짜 {getSortIcon('date')}
              </th>
              <th className={getSortableHeaderClass('name')} onClick={() => handleSort('name')}>
                이름(직급) {getSortIcon('name')}
              </th>
              <th className={getSortableHeaderClass('taskType')} onClick={() => handleSort('taskType')}>
                업무유형
              </th>
              <th className={getSortableHeaderClass('endTime')} onClick={() => handleSort('endTime')}>
                업무 종료 날짜
              </th>
              <th className={getSortableHeaderClass('startTime')} onClick={() => handleSort('startTime')}>
                시작 시간
              </th>
              <th className={getSortableHeaderClass('totalDuration')} onClick={() => handleSort('totalDuration')}>
                종료 시간
              </th>
              <th className={getSortableHeaderClass('count')} onClick={() => handleSort('count')}>
                수행개수
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
              {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                개수당 평균시간
              </th> */}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                평균대비
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                평균대비(%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData?.length > 0 ? (
              sortedData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {
                    user?.auth_code === "A1" ? <td className="px-4 py-3 whitespace-nowrap"><input className='cursor-pointer' type='checkbox'
                      checked={selected?.task_start_id === data.task_start_id}
                      onChange={() => handleCheckboxChange(data)}></input></td> : ''
                  }
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_start_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.user.user_name}({data.user.user_position})</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.process.process_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_end?.task_end_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_start_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_end?.task_end_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_end?.total_count}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.sum_hour}:{data.sum_minute}</td>
                  <td className="px-4 py-3 whitespace-nowrap ">
                    {data.avg_count_per_hour}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.task_end?.hour_average}</td>
                  {/* <td className="px-4 py-3 whitespace-nowrap">
                    {(() => {
                      const totalMinutes = (parseInt(data.sum_hour || 0) * 60) + parseInt(data.sum_minute || 0);
                      const totalSeconds = totalMinutes * 60;
                      const count = data.task_end?.total_count || 1;
                      const avgSeconds = Math.floor(totalSeconds / count);

                      const hours = Math.floor(avgSeconds / 3600);
                      const minutes = Math.floor((avgSeconds % 3600) / 60);
                      const seconds = avgSeconds % 60;

                      return `${hours}시간 ${minutes}분 ${seconds}초`;
                    })()}
                  </td> */}
                  <td className="px-4 py-3 whitespace-nowrap">{calculateDifference(data.avg_count_per_hour, data.task_end?.hour_average)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{calculatePercentageDifference(data.avg_count_per_hour, data.task_end?.hour_average)}</td>
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
