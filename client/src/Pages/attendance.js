import React, { useState, useEffect } from 'react';
import { ReactComponent as Icon1 } from '../Assets/Images/volume-up.svg';
import axios from '../Api';

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
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return (
        <>
            <div className="box notice">
                <Icon1 className="icon" />
                <p>공지입니다</p>
            </div>
            <div className="box bord-box times">
                <h4>
                    {`${year}년 ${month}월 ${date}일 (${day})`}
                </h4>
                <h2>
                    {`${period} ${formattedHours}:${minutes}`}
                </h2>
            </div>
            <div className="box register">
                <div className="register__form">
                    <p>성수기적용</p>
                    <p>08:00 ~ 22:00</p>
                </div>
                <div className="register__form">
                    <p>휴게시간</p>
                    <p>12:00 ~ 13:00</p>
                </div>
                <div className="register__form">
                    <h4>07:48~</h4>
                    <div>
                        <span>근무중</span>
                    </div>
                </div>
                <div className='register__form btn_container'>
                    <button>
                        출근
                    </button>
                    <button>
                        퇴근
                    </button>
                </div>
            </div>
        </>
    );
}

export default Register;
