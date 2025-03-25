import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Schedule.css';
import BottomBar from '../Components/BottomBar';
import { VACATION_REGISTER_REQUEST, VACATION_USER_REQUEST } from '../reducers/vacation';
import { useDispatch, useSelector } from 'react-redux';
import { select } from 'redux-saga/effects';

const WorkLogs = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const vacationDates = [
        new Date(2025, 2, 19),
        new Date(2025, 12, 20),
        new Date(2025, 2, 21)
    ];
    const reasonInputRef = useRef(null);
    const { vacationUser } = useSelector((state) => state.vacation);
    console.log(vacationUser)


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
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        const thisLast = new Date(viewYear, viewMonth + 1, 0);
        const TLDate = thisLast.getDate();
        const firstDay = new Date(viewYear, viewMonth, 1).getDay();

        const thisDates = [...Array(TLDate).keys()].map(i => i + 1);
        const totalDays = [...Array(firstDay).fill(''), ...thisDates];

        return totalDays.map((d, i) => {
            console.log(d)
            if (d === '') {
                return <div key={i} className="date empty"></div>;
            }

            const dayOfWeek = new Date(viewYear, viewMonth, d).getDay();
            const isToday = (d === todayDate) && (viewMonth === todayMonth) && (viewYear === todayYear);
            const formattedDate = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

            const isVacation = vacationDays?.includes(formattedDate); // 문자열 비교
            const vacation_allow = vacationAllows?.includes(formattedDate); // 문자열 비교

            const isSelected = selectedDate === `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
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
                        hover:bg-blue-200 transition`}
                    onClick={handleDateClick}
                >
                    <div className={`day-number h-8 ${isSelected ? "text-white font-bold" : ""}  ${dayOfWeek === 0 ? "text-red-500" : dayOfWeek === 6 ? "text-blue-500" : "text-gray-900"}`}>
                        {d}
                    </div>
                    <div className="text-xl text-red-500 font-bold h-8">{isVacation ? "⭕" : ""} {vacation_allow ? "🔴" : ""}</div>                </div>
            );
        });
    };




    const dispatch = useDispatch();

    useEffect(() => {
        handleVacationUser();
    }, []);

    const handleVacationUser = () => {
        dispatch({
            type: VACATION_USER_REQUEST,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedDate)
        console.log(reason)

        const data = {
            vacation_date: selectedDate,
            vacation_content: reason
        }

        dispatch({
            type: VACATION_REGISTER_REQUEST,
            data: data
        });
        // setIsSubmitting(true);
        // setTimeout(() => {
        //     alert(`휴가 신청 완료: ${selectedDate} - 사유: ${reason}`);
        //     setIsSubmitting(false);
        //     setReason("");
        // }, 1000);
    };
    {/* <div className='w-full h-[80%] overflow-y-auto'></div> */ }
    return (
        <div className='w-full flex justify-center items-center overflow-y-auto'>
            <div className='w-[90%]  h-[80%] overflow-y-auto'>
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
                        🔴 : 휴가 ⭕ : 휴가 신청
                    </div>
                </div>
                {selectedDate && (
                    <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow w-full">
                        <h2 className="text-xl font-semibold">휴가 신청</h2>
                        <p className="text-gray-800 mt-2 text-lg">선택한 날짜: {selectedDate}</p>
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
                )}
            </div>
            <BottomBar />
        </div>
    );
};

export default WorkLogs;
