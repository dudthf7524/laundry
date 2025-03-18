import { useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import { employees } from '../data/mockData';

const TaskStatsTable = ({ records, onSort, sortConfig, taskType }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? `${employee.name} (${employee.nickname})` : 'Unknown';
  };

  const handleSort = (field) => {
    onSort(field);
  };

  const toggleRowExpand = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

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
    return `px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 ${
      sortConfig.field === field ? 'bg-gray-50' : ''
    }`;
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {taskType ? `${taskType} 업무 통계` : '전체 업무 통계'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          각 직원별 업무 수행 현황 및 효율성 분석
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={getSortableHeaderClass('date')} onClick={() => handleSort('date')}>
                날짜 {getSortIcon('date')}
              </th>
              <th className={getSortableHeaderClass('name')} onClick={() => handleSort('employeeId')}>
                이름 {getSortIcon('employeeId')}
              </th>
              {!taskType && (
                <th className={getSortableHeaderClass('taskType')} onClick={() => handleSort('taskType')}>
                  업무유형 {getSortIcon('taskType')}
                </th>
              )}
              <th className={getSortableHeaderClass('startTime')} onClick={() => handleSort('startTime')}>
                시작 시간 {getSortIcon('startTime')}
              </th>
              <th className={getSortableHeaderClass('endTime')} onClick={() => handleSort('endTime')}>
                종료 시간 {getSortIcon('endTime')}
              </th>
              <th className={getSortableHeaderClass('totalDuration')} onClick={() => handleSort('totalDuration')}>
                총 소요 시간 {getSortIcon('totalDuration')}
              </th>
              <th className={getSortableHeaderClass('count')} onClick={() => handleSort('count')}>
                개수 {getSortIcon('count')}
              </th>
              <th className={getSortableHeaderClass('averageTimePerItem')} onClick={() => handleSort('averageTimePerItem')}>
                개수 당 평균시간 {getSortIcon('averageTimePerItem')}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                평균 대비
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(record.date, 'yyyy-MM-dd')}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{getEmployeeName(record.employeeId)}</td>
                  {!taskType && (
                    <td className="px-4 py-3 whitespace-nowrap">{record.taskType}</td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap">{record.startTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.endTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.totalDuration}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.count}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.averageTimePerItem}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    {getComparisonArrow(record.comparedToAverage)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={taskType ? 8 : 9} className="px-4 py-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      {records.length > 0 && (
        <div className="bg-gray-50 px-4 py-5 sm:p-6 border-t border-gray-200">
          <h4 className="text-base font-medium text-gray-900 mb-3">요약 통계</h4>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">총 작업 건수</dt>
              <dd className="mt-1 text-2xl font-semibold text-blue-600">{records.length}건</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">총 처리 항목</dt>
              <dd className="mt-1 text-2xl font-semibold text-blue-600">
                {records.reduce((sum, record) => sum + record.count, 0)}개
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">평균 처리 시간</dt>
              <dd className="mt-1 text-2xl font-semibold text-blue-600">
                {(() => {
                  // Calculate average time per item across all records
                  const totalItems = records.reduce((sum, record) => sum + record.count, 0);
                  const totalMinutes = records.reduce((sum, record) => {
                    const [hours, minutes] = record.totalDuration.split(':').map(Number);
                    return sum + (hours * 60 + minutes);
                  }, 0);

                  if (totalItems === 0) return '0:00';

                  const avgMinutesPerItem = totalMinutes / totalItems;
                  const hours = Math.floor(avgMinutesPerItem / 60);
                  const minutes = Math.floor(avgMinutesPerItem % 60);
                  const seconds = Math.round((avgMinutesPerItem % 1) * 60);

                  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                })()}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default TaskStatsTable;
