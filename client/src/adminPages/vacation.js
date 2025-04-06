import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VACATION_ALLOW_REQUEST, VACATION_LIST_REQUEST } from "../reducers/vacation";
import VacationList from "./vacationList";
import VacationUser from "./vacationUser";
import VacationCompany from "./vacationCompany";

const Vacation = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  const { vacationLists = [] } = useSelector((state) => state.vacation);
  const [activeTab, setActiveTab] = useState('vacationList');

  console.log(vacationLists)
  useEffect(() => {
    dispatch({ type: VACATION_LIST_REQUEST });
  }, [dispatch]);

  var vacationDays;
  var vacationAllows;



  console.log(vacationDays)
  console.log(vacationAllows)
  if (vacationLists) {
    vacationDays = vacationLists
      .filter((v) => v.vacation_state === "신청")
      .map((v) => v.vacation_date); // 전체 날짜 문자열 저장
  }

  if (vacationLists) {
    vacationAllows = vacationLists
      .filter((v) => v.vacation_state === "승인")
      .map((v) => v.vacation_date); // 전체 날짜 문자열 저장
  }


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
  // 신청된 휴가 날짜 목록 추출


  // 선택한 날짜의 휴가 정보


  const selectedVacation = Array.isArray(vacationLists)
    ? vacationLists.find((v) => v.vacation_state === "신청" && v.vacation_date === selectedDate)
    : null;

  const selectedVacationComplete = Array.isArray(vacationLists)
    ? vacationLists.find((v) => v.vacation_state === "승인" && v.vacation_date === selectedDate)
    : null;

  // 날짜 클릭 시
  const handleDateClick = (year, month, day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  const vacationAllow = () => {
    alert('휴가가 승인 되었습니다.')

    console.log(selectedVacation.vacation_id)
    const data = {
      vacation_id: selectedVacation.vacation_id
    }
    dispatch({
      type: VACATION_ALLOW_REQUEST,
      data: data
    });
  }

  // 캘린더 렌더링
  const renderCalendar = () => {
    const viewYear = date.getFullYear();

    const viewMonth = date.getMonth();

    const today = new Date();


    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();


    const totalDays = [...Array(firstDay).fill(""), ...Array(lastDate).keys()].map((i) => i + 1);


    return totalDays.map((d, i) => {
      if (d === "") return <div key={i} className="date empty"></div>;

      const formattedDate = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isVacation = vacationDays?.includes(formattedDate); // 문자열 비교
      const vacation_allow = vacationAllows?.includes(formattedDate); // 문자열 비교

      const isToday = today.getDate() === d && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
      const isSelected = selectedDate === formattedDate;
      const dayOfWeek = (i % 7);
      const textColor = dayOfWeek === 0 ? "text-red-500" : dayOfWeek === 6 ? "text-blue-500" : "text-gray-900";
      const bgColor = isSelected ? "bg-blue-300" : isToday ? "bg-yellow-300" : "";

      return (
        <div
          key={i}
          className={`flex items-center justify-center p-4 cursor-pointer flex-col text-lg  ${bgColor}`}
          onClick={() => handleDateClick(viewYear, viewMonth, d)}
        >
          <div className={`h-8 text-lg ${textColor}`}>
            {d}
          </div>
          <div className="text-xl text-red-500 font-bold h-8">{isVacation ? "⭕" : ""} {vacation_allow ? "🔴" : ""}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">휴가 관리</h1>
        <p className="text-gray-600 mt-1">휴가 정보를 조회하고 관리합니다</p>
      </div>

    
      <div className="bg-white shadow overflow-hidden">
        <nav className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'vacationList'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('vacationList')}
          >
            조회/승인
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'vacationUser'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('vacationUser')}
          >
            휴가 설정(직원)
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'vacationCompany'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('vacationCompany')}
          >
            휴무일 설정(회사)
          </button>
        </nav>
      </div>
      {/* 선택된 날짜 정보 */}


      {activeTab === 'vacationList' && (
        <div className="space-y-6">
          <VacationList />
        </div>

      )}

      {activeTab === 'vacationUser' && (
        <div className="space-y-6">
          <VacationUser />
        </div>

      )}

      {activeTab === 'vacationCompany' && (
        <div className="space-y-6">
          <VacationCompany />
        </div>

      )}

    </div>
  );
};

export default Vacation;
