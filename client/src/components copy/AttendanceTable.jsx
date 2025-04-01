import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';

const AttendanceTable = ({ setSelected, selected }) => {
  const { isFieldHidden } = useAuth();
  const { attendanceStartYear } = useSelector((state) => state.attendanceStart);

  const [expandedRowId, setExpandedRowId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });

  // const [selected, setSelected] = useState(null); // ✅ 선택된 항목 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 열림 상태
  // const [editData, setEditData] = useState({}); // ✅ 수정할 데이터 상태

  // 정렬 처리 함수
  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // const handleCheckboxChange = (asy) => {
  //   console.log(asy)
  //   setSelected(prev => ({
  //     ...prev,
  //     attendance_start_id: asy.attendance_start_id,

  //     // 필요에 따라 더 많은 정보를 추가할 수 있습니다
  //   }));
  // };

  const handleCheckboxChange = (asy) => {
    if (!asy.attendance_end) {
      alert('퇴근에 대한 데이터가 존재하지 않습니다. 근무자에게 요청해주세요!!')
      return;
    }
    setSelected({
      user_name: asy.user.user_name,
      user_position: asy.user.user_position,
      attendance_start_id: asy.attendance_start_id,
      attendance_start_date: asy.attendance_start_date,
      attendance_start_time: asy.attendance_start_time,
      attendance_start_state: asy.attendance_start_state,
      attendance_end_id: asy.attendance_end.attendance_end_id,
      attendance_end_date: asy.attendance_end.attendance_end_date,
      attendance_end_time: asy.attendance_end.attendance_end_time,
    });
  };

  // 입력값 변경 핸들러

  // const [selected, setSelected] = useState({
  //   attendance_start_id: "",
  // });
  var sortedData;


  // 정렬된 데이터 반환
  if (attendanceStartYear) {
    sortedData = [...attendanceStartYear].sort((a, b) => {
      if (!sortConfig.field) return 0;

      const valueA = a.user[sortConfig.field] || a[sortConfig.field];
      const valueB = b.user[sortConfig.field] || b[sortConfig.field];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === 'asc'
          ? valueA.localeCompare(valueB, 'ko-KR')
          : valueB.localeCompare(valueA, 'ko-KR');
      }

      return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }



  // 정렬 아이콘 표시
  const getSortIcon = (field) => {
    if (sortConfig.field !== field) {
      return <span className="text-gray-300">↕</span>;
    }
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  // 정렬 가능한 헤더 스타일
  const getSortableHeaderClass = (field) => {
    return `px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 ${sortConfig.field === field ? 'bg-gray-100' : ''
      }`;
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="overflow-x-auto">

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={getSortableHeaderClass('user_name')} onClick={() => handleSort('user_name')}>
                선택
              </th>
              <th className={getSortableHeaderClass('user_name')} onClick={() => handleSort('user_name')}>
                이름 {getSortIcon('user_name')}
              </th>
              <th className={getSortableHeaderClass('user_position')} onClick={() => handleSort('user_position')}>
                직무형태
              </th>
              <th className={getSortableHeaderClass('attendance_start_date')} onClick={() => handleSort('attendance_start_date')}>
                출근날짜
              </th>
              <th className={getSortableHeaderClass('attendance_start_time')} onClick={() => handleSort('attendance_start_time')}>
                출근시간
              </th>
              <th className={getSortableHeaderClass('attendance_start_state')} onClick={() => handleSort('attendance_start_state')}>
                출근상태
              </th>
              <th className={getSortableHeaderClass('attendance_end_date')} onClick={() => handleSort('attendance_end_date')}>
                퇴근날짜
              </th>
              <th className={getSortableHeaderClass('attendance_end_time')} onClick={() => handleSort('attendance_end_time')}>
                퇴근시간
              </th>
              <th className={getSortableHeaderClass('attendance_end_state')} onClick={() => handleSort('attendance_end_state')}>
                퇴근상태
              </th>
              {!isFieldHidden('totalWorkHours') && (
                <th className={getSortableHeaderClass('sum_hour')} onClick={() => handleSort('sum_hour')}>
                  총근무시간
                </th>
              )}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">자세히</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData ? (
              sortedData.map((asy, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap"><input type='checkbox'
                    checked={selected?.attendance_start_id === asy.attendance_start_id}
                    onChange={() => handleCheckboxChange(asy)}></input></td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.user.user_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.user.user_position}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_start_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_start_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_start_state}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_end?.attendance_end_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_end?.attendance_end_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_end?.attendance_end_state}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.sum_hour}시간 {asy.sum_minute}분</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => setExpandedRowId(expandedRowId === asy.id ? null : asy.id)} className="text-blue-600 hover:text-blue-900">
                      {expandedRowId === asy.id ? '접기' : '펼치기'}
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

    </div>
  );
};

export default AttendanceTable;








