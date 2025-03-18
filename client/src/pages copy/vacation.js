import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { employees, permissionLevels } from '../data/mockData';
const SelectDatePage2 = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
  const vacationDate = new Date(2025, 2, 19); // 휴가 날짜 (2025-03-19)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };
  // 요일 번호를 요일 이름으로 변환
  const getDayName = (dayIndex) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dayIndex];
  };
  const getPermissionColor = (permission) => {
    switch (permission) {
      case 'master':
        return 'bg-red-100 text-red-800';
      case 'submaster':
        return 'bg-orange-100 text-orange-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'employee':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 날짜를 렌더링하는 함수
  const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const thisLast = new Date(viewYear, viewMonth + 1, 0);
    const TLDate = thisLast.getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();

    const thisDates = [...Array(TLDate).keys()].map(i => i + 1);
    const totalDays = [...Array(firstDay).fill(''), ...thisDates];

    return totalDays.map((d, i) => {
      if (d === '') {
        return <div key={i} className="date empty"></div>;
      }

      const dayOfWeek = new Date(viewYear, viewMonth, d).getDay();
      const isToday = (d === todayDate) && (viewMonth === todayMonth) && (viewYear === todayYear);
      const isVacation = (d === vacationDate.getDate()) && (viewMonth === vacationDate.getMonth()) && (viewYear === vacationDate.getFullYear());

      return (
        <div
          key={i}
          className="flex items-center justify-center p-4 text-center cursor-pointer flex-col"
          onClick={() => setSelectedDate(new Date(viewYear, viewMonth, d))}
        >
          <div className="day-number">{d}</div>
          <div className="">O</div>
        </div>
      );
    });
  };

  const filteredEmployees = employees?.filter(employee => {
    const lowerCaseSearch = searchTerm.toLowerCase();

    console.log(employee.name)
    return (
      employee.name.toLowerCase().includes(lowerCaseSearch) ||
      employee.nickname.toLowerCase().includes(lowerCaseSearch) ||
      employee.role.toLowerCase().includes(lowerCaseSearch)
    );
  });

  // 이전, 다음, 오늘 버튼 동작
  const changeMonth = (offset) => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const goToday = () => {
    setDate(new Date());
  };

  // 캘린더 렌더링
  const calendarDays = renderCalendar();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">직원 관리</h1>
        <p className="text-gray-600 mt-1">
          직원 정보를 조회하고 관리합니다
        </p>
      </div>
      {/* 왼쪽 달력 영역 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-semibold">
            {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
          </div>
          <div className="nav space-x-2">
            <button className="nav-btn go-prev text-xl" onClick={() => changeMonth(-1)}>
              &lt;
            </button>
            <button className="nav-btn go-today text-xl" onClick={goToday}>
              Today
            </button>
            <button className="nav-btn go-next text-xl" onClick={() => changeMonth(1)}>
              &gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          <div className="font-semibold">일</div>
          <div className="font-semibold">월</div>
          <div className="font-semibold">화</div>
          <div className="font-semibold">수</div>
          <div className="font-semibold">목</div>
          <div className="font-semibold">금</div>
          <div className="font-semibold">토</div>
        </div>
        <div className="dates grid grid-cols-7 gap-2">
          {calendarDays}
        </div>

      </div>

      {/* 오른쪽 선택된 날짜 영역 */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredEmployees ? (
            filteredEmployees.map((employee) => (
              <li
                key={employee.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''
                  }`}
                onClick={() => handleEmployeeSelect(employee)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-bold">
                        {employee.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="text-lg font-medium text-gray-900">{employee.name}</span>
                          <span className="ml-2 text-sm text-gray-500">({employee.nickname})</span>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionColor(employee.permission)}`}>
                            {permissionLevels[employee.permission]?.name || '일반'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.role} • {employee.years}년차
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center">
                    <>
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        수정
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        삭제
                      </button>
                    </>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">
              검색 결과가 없습니다
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SelectDatePage2;
