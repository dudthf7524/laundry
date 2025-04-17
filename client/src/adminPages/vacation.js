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
