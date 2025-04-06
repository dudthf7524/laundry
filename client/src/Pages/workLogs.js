import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Schedule.css';
import BottomBar from '../components/BottomBar';
import { VACATION_REGISTER_REQUEST, VACATION_USER_REQUEST } from '../reducers/vacation';
import { useDispatch, useSelector } from 'react-redux';
import { select } from 'redux-saga/effects';
import { COMPANY_VACATION_LIST_REQUEST } from '../reducers/companyVacation';

const WorkLogs = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const reasonInputRef = useRef(null);
    const { vacationUser } = useSelector((state) => state.vacation);




    var userVaction;

    if (vacationUser) {
        userVaction = vacationUser
            .filter((v) => v.vacation_date === selectedDate)
            .map((v) => ({
                vacation_date: v.vacation_date,
                vacation_state: v.vacation_state,
                vacation_content: v.vacation_content,  // 상태도 포함
            })); // 전체 날짜 문자열 저장
    }



    var vacationDays;
    var vacationAllows;

    if (vacationUser) {
        vacationDays = vacationUser
            .filter((v) => v.vacation_state === "신청")
            .map((v) => v.vacation_date); // 전체 날짜 문자열 저장
    }

    if (vacationUser) {
        vacationAllows = vacationUser
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
            if (d === '') {
                return <div key={i} className="date empty"></div>;
            }

            const dayOfWeek = new Date(viewYear, viewMonth, d).getDay();
            const isToday = today.getDate() === d && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
            const formattedDate = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const isVacation = vacationDays?.includes(formattedDate); // 문자열 비교
            const vacation_allow = vacationAllows?.includes(formattedDate); // 문자열 비교
            const isSelected = selectedDate === `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const bgColor = isSelected ? "bg-blue-300" : isToday ? "bg-yellow-300" : "";
            const company_vacation = conpanyVacationLists?.some(v => v.company_vacation_date === formattedDate); // 회사 휴무일 (🟠)

            const handleDateClick = () => {
                const formattedDate = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                setSelectedDate(formattedDate);

                setTimeout(() => {
                    reasonInputRef.current?.focus();
                },);
            };
            return (
                <div
                    key={i}
                    className={`flex items-center justify-center p-4 text-center cursor-pointer flex-col  text-lg 
                        ${isSelected ? "bg-blue-500 text-white font-bold" : "text-gray-900"} 
                        hover:bg-blue-200 transition ${bgColor}`}
                    onClick={handleDateClick}
                >
                    <div className={`day-number h-8 ${isSelected ? "text-white font-bold" : ""}  ${dayOfWeek === 0 ? "text-red-500" : dayOfWeek === 6 ? "text-blue-500" : "text-gray-900"}`}>
                        {d}
                    </div>
                    <div className="text-xl text-red-500 font-bold h-8">
                        {isVacation ? "⭕" : ""}
                        {vacation_allow ? "🔴" : ""}
                        {company_vacation ? "🟠" : ""}
                    </div>
                </div>
            );
        });
    };

    const dispatch = useDispatch();
    const { conpanyVacationLists = [] } = useSelector((state) => state.companyVacation);
    const selectedCompanyVacation = Array.isArray(conpanyVacationLists)
        ? conpanyVacationLists.find((v) => v.company_vacation_date === selectedDate)
        : null;

    useEffect(() => {
        handleVacationUser();
        handleVacationCompany();
    }, []);

    const handleVacationUser = () => {
        dispatch({
            type: VACATION_USER_REQUEST,
        });
    };
    const handleVacationCompany = () => {
        dispatch({
            type: COMPANY_VACATION_LIST_REQUEST,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            vacation_date: selectedDate,
            vacation_content: reason
        }

        dispatch({
            type: VACATION_REGISTER_REQUEST,
            data: data
        });
    };




    return (
        <div className="w-full flex flex-col justify-center items-center overflow-y-auto h-full">
            <div className='w-[90%] h-full'>
                <div className="mb-6 p-4 w-full">
                    <h1 className="text-3xl font-bold text-gray-900">휴가 신청</h1>
                    <p className="text-gray-700 mt-1 text-lg">날짜를 선택하고 휴가를 신청하세요</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow mb-6">
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
                    <div className="grid grid-cols-7 gap-2 text-center text-lg font-semibold">
                        <div className="text-red-500">일</div>
                        <div>월</div>
                        <div>화</div>
                        <div>수</div>
                        <div>목</div>
                        <div>금</div>
                        <div className="text-blue-500">토</div>
                    </div>
                    <div className="dates grid grid-cols-7 gap-2">
                        {renderCalendar()}
                    </div>
                    <div className="">
                        🔴 : 휴가 ⭕ : 휴가 신청 🟠 : 휴무일
                    </div>
                </div>

                {selectedDate && !selectedCompanyVacation && userVaction?.length === 0 ? (
                    <div className="p-4 mt-4 bg-white rounded-lg shadow w-full">
                        <h2 className="text-xl font-semibold mb-3">휴가 신청</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">선택한 날짜</label>
                            <input
                                type="text"
                                name="notice_title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                                value={selectedDate}
                                readOnly
                            />
                        </div>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <label className="block text-gray-700 text-lg">사유 입력</label>
                            <textarea
                                ref={reasonInputRef}
                                className="w-full p-3 border rounded mt-2 text-lg"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            />
                            <button type="submit" className="w-full h-20 mt-4 px-4 py-2 bg-blue-500 text-white text-lg font-bold rounded" disabled={isSubmitting}>
                                {isSubmitting ? "신청 중..." : "휴가 신청"}
                            </button>
                        </form>
                    </div>

                ) : (
                    <div>
                        {
                            userVaction?.map((uv, index) => {
                                return (
                                    <div key={index} className="p-4 mt-4 bg-white rounded-lg shadow w-full">
                                        <h2 className="text-xl font-semibold mb-3">휴가</h2>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">날짜</label>
                                            <input
                                                type="text"
                                                name="notice_title"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                                                value={uv.vacation_date}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">상태</label>
                                            <input
                                                type="text"
                                                name="notice_title"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                                                value={uv.vacation_state}
                                                readOnly
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">사유</label>
                                            <textarea
                                                name="notice_content"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                rows="6"
                                                value={uv.vacation_content}
                                                readOnly
                                            ></textarea>
                                        </div>
                                    </div>
                                )
                            })
                        }
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

        </div>
    );
};

export default WorkLogs;
