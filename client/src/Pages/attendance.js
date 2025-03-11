import React, { useState, useEffect } from 'react';
import { ReactComponent as Icon1 } from '../Assets/Images/volume-up.svg';
import '../css/attendance.css';
import BottomBar from "../Components/BottomBar";


const Register = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // 1초마다 갱신
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    }, []);

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
        <div className='attendance'>
            <div></div>
            <div className="notice">
                <Icon1 className="icon" />
                <p>공지입니다</p>
            </div>
            <div className="date_month_time">
                <div className='date_month'>
                    {`${year}년 ${month}월 ${date}일 (${day})`}

                </div>
                <div className='time'>
                    {`${period} ${formattedHours}:${minutes}:${seconds}`}
                </div>
            </div>
            <div className="work_time">
             
                <div className="work_time_option">
                    <p>휴게시간</p>
                    <p>12:00 ~ 13:00</p>
                </div>
                <div className="work_time_option">
                    <span className='working'>근무중</span>
                </div>
                <div className="work_time_option">
                    <p>출근시간</p>
                    <p>07:15</p>
                </div>
                <div className="work_time_option">
                    <p>퇴근시간</p>
                    <p>18:00</p>
                </div>
                <div className='button'>
                    <button>
                        출근
                    </button>
                    <button>
                        퇴근
                    </button>
                </div>

            </div>
            <BottomBar />
        </div>
    );
}

export default Register;
