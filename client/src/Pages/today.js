import { useEffect, useState } from "react";

const Today = () => {
    useEffect(() => {
        today();

    }, []);

    const today = () => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // 1초마다 갱신
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    }
    const [currentTime, setCurrentTime] = useState(new Date());

    // 날짜 포맷팅
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
    const date = String(currentTime.getDate()).padStart(2, '0');
    const day = days[currentTime.getDay()];
    // 시간 포맷팅
    const hours = currentTime.getHours();
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return (
        <div className="date_month_time">
            <div className='date_month'>
                {`${year}년 ${month}월 ${date}일 (${day})`}

            </div>
            <div className='time'>
                {`${period} ${formattedHours}:${minutes}:${seconds}`}
            </div>
        </div>
    )

}

export default Today;