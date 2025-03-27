import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employees, permissionLevels } from "../data/mockData";
import { VACATION_ALLOW_REQUEST, VACATION_LIST_REQUEST } from "../reducers/vacation";

const SelectDatePage2 = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { vacationLists = [] } = useSelector((state) => state.vacation);

  console.log(vacationLists)
  useEffect(() => {
    dispatch({ type: VACATION_LIST_REQUEST });
  }, [dispatch]);

  var vacationDays;
  var vacationAllows;
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

      {/* 캘린더 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-center items-center py-4 relative mb-2">
            <button className="pr-10 nav-btn go-prev text-2xl font-bold" onClick={() => changeMonth(-1)}>
              &lt;
            </button>
            <div className="text-2xl font-semibold cursor-pointer" onClick={goToday}>
              {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
            </div>
            <button className="pl-10 nav-btn go-next text-2xl font-bold" onClick={() => changeMonth(1)}>
              &gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-lg font-semibold">
          <div className="text-red-500">일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div className="text-blue-500">토</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
        <div className="">
          🔴 : 휴가 ⭕ : 휴가 신청
        </div>
      </div>

      {/* 선택된 날짜 정보 */}
      {selectedVacation && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold">휴가 신청 정보</h2>
          <p className="mt-2">날짜: {selectedVacation?.vacation_date}</p>
          <p className="mt-1">사유: {selectedVacation?.vacation_content}</p>
          <div className="mt-4 flex space-x-2">
            <button onClick={vacationAllow} className="px-4 py-2 bg-green-500 text-white rounded">승인</button>
            {/* <button className="px-4 py-2 bg-red-500 text-white rounded">거절</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectDatePage2;
