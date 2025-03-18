import { useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import { useAuth } from '../contexts/AuthContext';
import { employees } from '../data/mockData';

const AttendanceTable = ({ records, onSort, sortConfig }) => {
  const { currentUser, canEditData, isFieldHidden } = useAuth();
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

  const getStatusClass = (status) => {
    switch (status) {
      case '근무중':
        return 'bg-green-100 text-green-800';
      case '퇴근':
        return 'bg-gray-100 text-gray-800';
      case '지각':
        return 'bg-yellow-100 text-yellow-800';
      case '결근':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  const getSortableHeaderClass = (field) => {
    return `px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 ${
      sortConfig.field === field ? 'bg-gray-50' : ''
    }`;
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
              <th className={getSortableHeaderClass('roleType')} onClick={() => handleSort('roleType')}>
                직무형태 {getSortIcon('roleType')}
              </th>
              <th className={getSortableHeaderClass('scheduledStart')} onClick={() => handleSort('scheduledStart')}>
                지정출근시간 {getSortIcon('scheduledStart')}
              </th>
              <th className={getSortableHeaderClass('scheduledEnd')} onClick={() => handleSort('scheduledEnd')}>
                지정퇴근시간 {getSortIcon('scheduledEnd')}
              </th>
              <th className={getSortableHeaderClass('actualStart')} onClick={() => handleSort('actualStart')}>
                실제출근시간 {getSortIcon('actualStart')}
              </th>
              <th className={getSortableHeaderClass('actualEnd')} onClick={() => handleSort('actualEnd')}>
                실제퇴근시간 {getSortIcon('actualEnd')}
              </th>
              <th className={getSortableHeaderClass('status')} onClick={() => handleSort('status')}>
                근무상태 {getSortIcon('status')}
              </th>
              {!isFieldHidden('totalWorkHours') && (
                <th className={getSortableHeaderClass('totalWorkHours')} onClick={() => handleSort('totalWorkHours')}>
                  총근무시간 {getSortIcon('totalWorkHours')}
                </th>
              )}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                자세히
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(record.date, 'yyyy-MM-dd')}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{getEmployeeName(record.employeeId)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.roleType}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.scheduledStart}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.scheduledEnd}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.actualStart}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.actualEnd}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  {!isFieldHidden('totalWorkHours') && (
                    <td className="px-4 py-3 whitespace-nowrap">{record.totalWorkHours}</td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => toggleRowExpand(record.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {expandedRowId === record.id ? '접기' : '펼치기'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isFieldHidden('totalWorkHours') ? 9 : 10} className="px-4 py-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Extended Row Info - Shown when a row is expanded */}
      {expandedRowId && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          {records
            .filter(record => record.id === expandedRowId)
            .map(record => (
              <div key={`detail-${record.id}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">근무 시즌</h4>
                  <p className="mt-1">{record.season}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">휴일구분</h4>
                  <p className="mt-1">{record.holiday || '해당없음'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">휴게시간</h4>
                  <p className="mt-1">{record.breakTime || '해당없음'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">요청연장근무시간</h4>
                  <p className="mt-1">{record.requestedOvertime || '0:00'}</p>
                </div>
                {!isFieldHidden('totalWorkHours') && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">총근무시간합</h4>
                    <p className="mt-1">{record.totalWorkHours || '0:00'}</p>
                  </div>
                )}
                {!isFieldHidden('nightWorkHours') && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">야간근무시간</h4>
                    <p className="mt-1">{record.nightWorkHours || '0:00'}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-500">지각시간</h4>
                  <p className="mt-1">{record.lateHours || '0:00'}</p>
                </div>
                {!isFieldHidden('additionalWorkHours') && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">추가근무시간</h4>
                    <p className="mt-1">{record.additionalWorkHours || '0:00'}</p>
                  </div>
                )}
                {canEditData(record) && (
                  <div className="col-span-full mt-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                    >
                      수정
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
