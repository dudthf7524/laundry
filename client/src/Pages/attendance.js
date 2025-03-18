import React, { useState, useEffect } from 'react';
import { ReactComponent as Icon1 } from '../Assets/Images/volume-up.svg';
import '../css/attendance.css';
import BottomBar from "../Components/BottomBar";
import { useDispatch, useSelector } from 'react-redux';
import { TIME_DETAIL_REQUEST } from '../reducers/time';
import { WORK_END_TIME_REQUEST, WORK_NEW_ONE_REQUEST, WORK_REGISTER_REQUEST } from '../reducers/work';


const Attendance = () => {
    //✅정의
    const dispatch = useDispatch();
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
    //✅정의

    //✅함수
    const today = () => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // 1초마다 갱신
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    }

    const attendance = () => {
        const work_date = year + "-" + month + "-" + date;
        const work_attendance_time = hours + ":" + minutes;
        var work_state = "";

        if (timeDetail?.start_time < work_attendance_time) {
            work_state = "지각";
        } else {
            work_state = "근무중";
        }

        const data = {
            work_date : work_date,
            work_attendance_time : work_attendance_time,
            work_state : work_state,
        }

        dispatch({
            type: WORK_REGISTER_REQUEST,
            data:data
        });
    }

    const leaveWork = () => {
        const work_end_time = hours + ":" + minutes;

        const data = {
            work_id : workNewOne.work_id,
            work_end_time : work_end_time
        }

        dispatch({
            type: WORK_END_TIME_REQUEST,
            data:data
        });

    
      
    }
    //✅함수

    //✅데이터
    const { timeDetail } = useSelector((state) => state.time);
    const timeDetailLoding = () => {
        dispatch({
            type: TIME_DETAIL_REQUEST,
        });
    };

    const { workNewOne } = useSelector((state) => state.work);
    const workNewOneLoding = () => {
        dispatch({
            type: WORK_NEW_ONE_REQUEST,
        });
    };
    //✅데이터

    console.log(workNewOne)

    useEffect(() => {
        // today();
        timeDetailLoding();
        workNewOneLoding();
    }, []);


    // const isAttendanceDisabled = () => {
    //     const workStartTime = timeDetail?.start_time; // 예: "07:30"
    //     const workEndTime = timeDetail?.end_time; // 예: "18:00"

    //     if (!workStartTime || !workEndTime) {
    //         return false; // 출근, 퇴근 시간이 없으면 출근 가능
    //     }

    //     const [startHours, startMinutes] = workStartTime.split(':');
    //     const [endHours, endMinutes] = workEndTime.split(':');

    //     const workStartDate = new Date(`${year}-${month}-${date}T${startHours}:${startMinutes}:00`); // 출근 시간
    //     const workEndDate = new Date(`${year}-${month}-${date}T${endHours}:${endMinutes}:00`); // 퇴근 시간
    //     const earlyTimeLimit = new Date(workStartDate.getTime() - 30 * 60 * 1000); // 출근 30분 전
    //     const currentTimeForComparison = new Date(`${year}-${month}-${date}T${hours}:${minutes}:00`); // 현재 시간

    //     if (currentTimeForComparison > workEndDate) {
    //         return true; // 퇴근 시간이 지난 경우 비활성화
    //     }

    //     if (currentTimeForComparison < earlyTimeLimit) {
    //         return true; // 출근 30분 전이면 비활성화
    //     }

    //     return false; // 나머지 경우는 활성화
    // };

    // const isLeaveWorkDisabled = () => {
    //     const workEndTime = timeDetail?.end_time; // 예: "18:00"

    //     if (!workEndTime) {
    //         return false; // 퇴근 시간이 없으면 퇴근 가능
    //     }

    //     const [endHours, endMinutes] = workEndTime.split(':');
    //     const workEndDate = new Date(`${year}-${month}-${date}T${endHours}:${endMinutes}:00`); // 퇴근 시간
    //     const currentTimeForComparison = new Date(`${year}-${month}-${date}T${hours}:${minutes}:00`); // 현재 시간

    //     if (currentTimeForComparison >= workEndDate) {
    //         return true; // 퇴근 시간이 지나면 비활성화
    //     }

    //     return false; // 퇴근 가능
    // };
    
    // console.log(isLeaveWorkDisabled())
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
                    <p>출근시간</p>
                    <p>{timeDetail?.start_time}</p>
                </div>
                <div className="work_time_option">
                    <p>퇴근시간</p>
                    <p>{timeDetail?.end_time}</p>
                </div>
                <div className="work_time_option">
                    <p>휴게시간</p>
                    <p>{timeDetail?.rest_start_time} ~ {timeDetail?.rest_end_time}</p>
                </div>
                <div className="work_time_option">
                    <p className='working'>{workNewOne?.work_state}</p>
                    <p>{workNewOne?.work_start_time}</p>
                </div>
                <div className='button'>
                    <button disabled={workNewOne} onClick={() => {
                        attendance();
                    }}>
                        출근
                    </button>
                    <button disabled={!workNewOne} onClick={() => {
                        leaveWork();
                    }}>
                        퇴근
                    </button>
                </div>
            </div>
            <BottomBar />
        </div>
    );
}

export default Attendance;
