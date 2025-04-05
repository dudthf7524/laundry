import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VACATION_ALLOW_REQUEST, VACATION_LIST_REQUEST } from "../reducers/vacation";
import { COMPANY_VACATION_LIST_REQUEST } from "../reducers/companyVacation";

const VacationList = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const dispatch = useDispatch();

  const { vacationLists = [] } = useSelector((state) => state.vacation);
  const { conpanyVacationLists = [] } = useSelector((state) => state.companyVacation);


  useEffect(() => {
    dispatch({ type: VACATION_LIST_REQUEST });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: COMPANY_VACATION_LIST_REQUEST });
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
      newDate.setDate(1); // 날짜를 1일로 설정하여 월 변경 시 오류 방지
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
    ? vacationLists.filter((v) => v.vacation_state === "신청" && v.vacation_date === selectedDate)
    : [];

  const selectedVacationComplete = Array.isArray(vacationLists)
    ? vacationLists.filter((v) => v.vacation_state === "승인" && v.vacation_date === selectedDate)
    : [];

  const selectedCompanyVacation = Array.isArray(conpanyVacationLists)
    ? conpanyVacationLists.find((v) => v.company_vacation_date === selectedDate)
    : null;


  // 날짜 클릭 시
  const handleDateClick = (year, month, day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  const vacationAllow = (vacation_id) => {
    alert('휴가가 승인 되었습니다.')
    const data = {
      vacation_id: vacation_id
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

    const thisLast = new Date(viewYear, viewMonth + 1, 0);
    const TLDate = thisLast.getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();

    const thisDates = [...Array(TLDate).keys()].map(i => i + 1);
    const totalDays = [...Array(firstDay).fill(''), ...thisDates];

    return totalDays.map((d, i) => {
      if (d === "") return <div key={i} className="date empty"></div>;

      const formattedDate = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isVacation = vacationDays?.includes(formattedDate); // 문자열 비교
      const vacation_allow = vacationAllows?.includes(formattedDate); // 문자열 비교
      const company_vacation = conpanyVacationLists?.some(v => v.company_vacation_date === formattedDate); // 회사 휴무일 (🟠)
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
          <div className="text-xl font-bold h-8">
            {isVacation ? "⭕" : ""}
            {vacation_allow ? "🔴" : ""}
            {company_vacation ? "🟠" : ""}
          </div>
        </div>
      );
    });
  };

  return (
    <div>


      {/* 캘린더 */}
      <div className="bg-white p-4 shadow mb-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-center items-center py-4 relative mb-2 w-full">
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
        <div className="mt-5">
          🔴 : 휴가 ⭕ : 휴가 신청 🟠 : 휴무일
        </div>
      </div>

      {/* 선택된 날짜 정보 */}
      {selectedVacation.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">휴가 신청 정보</h2>
          {selectedVacation.map((vacation, index) => (
            <div key={index} className="mb-3 border-b">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">이름</label>
                <input
                  type="text"
                  name="notice_title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                  value={vacation?.user.user_name}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">날짜</label>
                <input
                  type="text"
                  name="notice_title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                  value={vacation?.vacation_date}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사유</label>
                <textarea
                  name="notice_content"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows="6"
                  value={vacation?.vacation_content}
                  readOnly
                ></textarea>
              </div>
              <div className="mt-4 flex space-x-2">
                <button onClick={() => vacationAllow(vacation?.vacation_id)} className="px-4 py-2 bg-green-500 text-white rounded">승인</button>
                {/* <button className="px-4 py-2 bg-red-500 text-white rounded">거절</button> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVacationComplete.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold">승인된 휴가 목록</h2>
          {selectedVacationComplete.map((vacation, index) => (
            <div key={index} className="mb-3 border-b">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">이름</label>
                <input
                  type="text"
                  name="notice_title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                  value={vacation.user.user_name}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">날짜</label>
                <input
                  type="text"
                  name="notice_title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                  value={vacation.vacation_date}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사유</label>
                <textarea
                  name="notice_content"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows="6"
                  value={vacation.vacation_content}
                  readOnly
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCompanyVacation && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">휴무일 정보</h2>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
              value={selectedCompanyVacation.company_vacation_date}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">사유</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="4"
              value={selectedCompanyVacation.company_vacation_reason}
              readOnly
            ></textarea>
          </div>
        </div>
      )}

    </div>
  );
};

export default VacationList;
