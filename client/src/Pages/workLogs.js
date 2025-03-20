import React, { useState } from 'react';
import '../Styles/Schedule.css';
import BottomBar from '../Components/BottomBar';

const WorkLogs = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const vacationDate = new Date(2025, 2, 19);

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

            const handleDateClick = () => {
                setSelectedDate(`${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
            };

            return (
                <div
                    key={i}
                    className="flex items-center justify-center p-4 text-center cursor-pointer flex-col"
                    onClick={handleDateClick}
                >
                    <div className={`day-number ${dayOfWeek === 0 ? "text-red-500" : dayOfWeek === 6 ? "text-blue-500" : "text-gray-900"}`}>
                        {d}
                    </div>
                    <div className="text-sm">{isVacation ? "휴가" : ""}</div>
                </div>
            );
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert(`휴가 신청 완료: ${selectedDate} - 사유: ${reason}`);
            setIsSubmitting(false);
            setReason("");
        }, 1000);
    };

    return (
        <>
            <div className="mb-6 p-4 w-full">
                <h1 className="text-2xl font-bold text-gray-900">휴가 신청</h1>
                <p className="text-gray-600 mt-1">날짜를 선택하고 휴가를 신청하세요</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center py-4">
                    <div className="text-xl font-semibold">
                        {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
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
                    {renderCalendar()}
                </div>
            </div>
            {selectedDate && (
                <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow w-full">
                    <h2 className="text-lg font-semibold">휴가 신청</h2>
                    <p className="text-gray-800 mt-2">선택한 날짜: {selectedDate}</p>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <label className="block text-gray-700">사유 입력</label>
                        <textarea
                            className="w-full p-2 border rounded mt-2"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" disabled={isSubmitting}>
                            {isSubmitting ? "신청 중..." : "휴가 신청"}
                        </button>
                    </form>
                </div>
            )}
            {/* <BottomBar /> */}
        </>
    );
};

export default WorkLogs;
