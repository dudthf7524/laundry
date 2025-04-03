import { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';

const AttendanceTable = () => {
  const { isFieldHidden } = useAuth();
  const { attendanceStartYear } = useSelector((state) => state.attendanceStart);

  const [expandedRowId, setExpandedRowId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const [searchName, setSearchName] = useState(''); // ✅ 검색할 이름

  // ✅ 이름으로 필터링된 데이터 가져오기
  const filteredData = useMemo(() => {
    if (!searchName.trim()) return attendanceStartYear || [];

    return attendanceStartYear?.filter((item) =>
      item.user.user_name.includes(searchName.trim())
    ) || [];
  }, [searchName, attendanceStartYear]);

  // ✅ 검색한 이름의 총 근무시간 합산
  const totalWorkTime = useMemo(() => {
    if (!filteredData.length) return { totalHours: 0, totalMinutes: 0 };
  
    const totalMinutes = filteredData.reduce((acc, item) => {
      const hours = parseInt(item.sum_hour.replace('시', ''), 10) || 0;
      const minutes = parseInt(item.sum_minute.replace('분', ''), 10) || 0;
      return acc + (hours * 60 + minutes);
    }, 0);
  
    return {
      totalHours: Math.floor(totalMinutes / 60),
      totalMinutes: totalMinutes % 60,
    };
  }, [filteredData]);

  // 정렬된 데이터 반환
  const sortedData = useMemo(() => {
    if (!filteredData.length) return [];

    return [...filteredData].sort((a, b) => {
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
  }, [filteredData, sortConfig]);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="p-4">
        {/* ✅ 이름 검색 필드 추가 */}
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />

        {/* ✅ 검색한 사용자의 총 근무시간 표시 */}
        {searchName && (
          <div className="p-4 bg-gray-100 text-lg font-semibold">
            "{searchName}"님의 총 근무시간: {totalWorkTime.totalHours}시간 {totalWorkTime.totalMinutes}분
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>이름</th>
              <th>직무형태</th>
              <th>출근날짜</th>
              <th>출근시간</th>
              <th>출근상태</th>
              <th>퇴근날짜</th>
              <th>퇴근시간</th>
              <th>퇴근상태</th>
              {!isFieldHidden('totalWorkHours') && <th>총근무시간</th>}
              <th>자세히</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((asy, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td>{asy.user.user_name}</td>
                  <td>{asy.user.user_position}</td>
                  <td>{asy.attendance_start_date}</td>
                  <td>{asy.attendance_start_time}</td>
                  <td>{asy.attendance_start_state}</td>
                  <td>{asy.attendance_end?.attendance_end_date}</td>
                  <td>{asy.attendance_end?.attendance_end_time}</td>
                  <td>{asy.attendance_end?.attendance_end_state}</td>
                  <td>{asy.sum_hour}시간 {asy.sum_minute}분</td>
                  <td>
                    <button
                      onClick={() => setExpandedRowId(expandedRowId === asy.id ? null : asy.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
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

