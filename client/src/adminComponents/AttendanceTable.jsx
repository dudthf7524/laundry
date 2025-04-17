import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';
import * as XLSX from "xlsx"; // 📌 엑셀 라이브러리 추가

const AttendanceTable = ({ setSelected, selected, setSortedData }) => {
  const { isFieldHidden } = useAuth();
  const { attendanceStartYear } = useSelector((state) => state.attendanceStart);
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const { user } = useSelector((state) => state.user);
  const excelImage = `${process.env.PUBLIC_URL}/icon/excel.png`;
  const [searchName, setSearchName] = useState(''); // ✅ 검색할 이름

  const filteredData = useMemo(() => {
    if (!searchName.trim()) return attendanceStartYear || [];

    return attendanceStartYear?.filter((item) =>
      item.user.user_name.includes(searchName.trim())
    ) || [];
  }, [searchName, attendanceStartYear]);

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

  useEffect(() => {
    if (setSortedData) {
      setSortedData(sortedData);
    }
  }, [sortedData, setSortedData]);

  // 정렬 처리 함수
  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

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


  // var sortedData;
  // // 정렬된 데이터 반환
  // if (attendanceStartYear) {
  //   sortedData = [...attendanceStartYear].sort((a, b) => {
  //     if (!sortConfig.field) return 0;

  //     let valueA = a.user[sortConfig.field] || a[sortConfig.field];
  //     let valueB = b.user[sortConfig.field] || b[sortConfig.field];

  //     // 출근 날짜 정렬 시 날짜 변환 후 비교
  //     if (sortConfig.field === "attendance_start_date") {
  //       valueA = new Date(valueA);
  //       valueB = new Date(valueB);
  //     }

  //     if (typeof valueA === "string" && typeof valueB === "string") {
  //       return sortConfig.direction === "asc"
  //         ? valueA.localeCompare(valueB, "ko-KR")
  //         : valueB.localeCompare(valueA, "ko-KR");
  //     }

  //     return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
  //   });
  // }

  const exportToExcel = () => {
    if (!sortedData) {
      alert("엑셀로 내보낼 데이터가 없습니다.");
      return;
    }

    // 데이터를 엑셀 형식으로 변환
    const worksheet = XLSX.utils.json_to_sheet(
      sortedData.map((asy) => ({
        이름: asy.user.user_name,
        직무형태: asy.user.user_position,
        출근날짜: asy.attendance_start_date,
        지정출근시간: asy.start_time,
        지정퇴근시간: asy.attendance_end.end_time,
        휴게시간: asy.rest_start_time + "~" + asy.rest_end_time,
        살제출근시간: asy.attendance_start_time,
        출근상태: asy.attendance_start_state,
        퇴근날짜: asy.attendance_end?.attendance_end_date || "-",
        실제퇴근시간: asy.attendance_end?.attendance_end_time || "-",
        퇴근상태: asy.attendance_end?.attendance_end_state || "-",
        총근무시간: `${asy.sum_hour}시간 ${asy.sum_minute}분`,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "출퇴근 기록");

    // 파일 다운로드
    XLSX.writeFile(workbook, "Attendance_Report.xlsx");
  };


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
      <div className="overflow-auto max-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {
                user?.auth_code === "A1" ? <th className={getSortableHeaderClass('user_name')} onClick={() => handleSort('user_name')}>
                  선택
                </th> : ''
              }

              <th className={getSortableHeaderClass('user_name')} onClick={() => handleSort('user_name')}>
                이름 {getSortIcon('user_name')}
              </th>
              <th className={getSortableHeaderClass('user_position')}>
                직무형태
              </th>
              <th className={getSortableHeaderClass('attendance_start_date')} onClick={() => handleSort('attendance_start_date')}>
                출근날짜 {getSortIcon('attendance_start_date')}
              </th>
              <th className={getSortableHeaderClass('attendance_start_time')}>
                지정 출근시간
              </th>
              <th className={getSortableHeaderClass('attendance_start_time')}>
                지정 퇴근시간
              </th>
              <th className={getSortableHeaderClass('attendance_start_time')}>
                휴게시간
              </th>
              <th className={getSortableHeaderClass('attendance_start_time')}>
                실제 출근시간
              </th>
              <th className={getSortableHeaderClass('attendance_start_state')} >
                출근상태
              </th>
              <th className={getSortableHeaderClass('attendance_end_date')} >
                퇴근날짜
              </th>
              <th className={getSortableHeaderClass('attendance_end_time')} >
                살제 퇴근시간
              </th>
              <th className={getSortableHeaderClass('attendance_end_state')} >
                퇴근상태
              </th>
              <th className={getSortableHeaderClass('sum_hour')} >
                총근무시간
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData ? (
              sortedData.map((asy, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {
                    user?.auth_code === "A1" ? <td className="px-4 py-3 whitespace-nowrap"><input className='cursor-pointer' type='checkbox'
                      checked={selected?.attendance_start_id === asy.attendance_start_id}
                      onChange={() => handleCheckboxChange(asy)}></input></td> : ''
                  }
                  <td className="px-4 py-3 whitespace-nowrap">{asy.user.user_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.user.user_position}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_start_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.start_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_end?.end_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.rest_start_time}~{asy.rest_end_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_start_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_start_state}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_end?.attendance_end_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_end?.attendance_end_time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{asy.attendance_end?.attendance_end_state}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {(asy.sum_hour < 0 || asy.sum_minute < 0)
                      ? "0시간 0분"
                      : `${asy.sum_hour}시간 ${asy.sum_minute}분`}
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
      <div className="p-4 flex justify-center">
        <div
          className="w-full h-12 cursor-pointer border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-500"
          onClick={exportToExcel}
        >
          <img className="w-10 h-10" src={excelImage} alt="excel" />
        </div>
      </div>

    </div>
  );
};

export default AttendanceTable;








