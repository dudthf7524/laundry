import React, { useState, useEffect } from 'react';
import '../Styles/Schedule.css';

const Schedule = () => {
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        // 예시 데이터
        const exampleData = [
            { date: '2025-02-01', type: 'holiday' }, // 휴일
            { date: '2025-02-02', type: 'workday' }, // 근무일
            { date: '2025-02-03', type: 'workday' }, // 근무일
        ];

        setCalendarData(exampleData);
    }, []);

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // 현재 월에 해당하는 날짜 배열 생성
    const generateCalendarDays = () => {
        const days = [];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // 이전 달 빈칸 추가
        for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
            days.push({ date: null });
        }

        // 현재 달 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayData = calendarData.find((item) => item.date === date) || { type: 'default' };
            days.push({ date, type: dayData.type });
        }

        return days;
    };

    const today = new Date();
    const monthName = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    const days = generateCalendarDays();

    return (
        <>
            <div className="calendar-container">
                <h1>{`${year}년 ${monthName}`}</h1>
                <div className="calendar-grid">
                    {/* 요일 표시 */}
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="calendar-day-header">
                            {day}
                        </div>
                    ))}

                    {/* 날짜 표시 */}
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`calendar-cell ${day.type}`}
                        >
                            {day.date ? new Date(day.date).getDate() : ''}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Schedule;
