import React, { useState, useEffect } from 'react';
import { ReactComponent as Icon1 } from '../Assets/Images/volume-up.svg';
import '../css/attendance.css';
import BottomBar from "../Components/BottomBar";
import { useDispatch, useSelector } from 'react-redux';
import { TIME_DETAIL_REQUEST } from '../reducers/time';
import { WORK_END_TIME_REQUEST, WORK_NEW_ONE_REQUEST, WORK_REGISTER_REQUEST } from '../reducers/work';
import { ATTENDANCESTART_NEW_ONE_REQUEST, ATTENDANCESTART_REGISTER_REQUEST } from '../reducers/attendanceStart';
import { ATTENDANCEEND_TIME_REQUEST } from '../reducers/attendanceEnd';


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
        const attendance_start_date = year + "-" + month + "-" + date;
        const attendance_start_time = hours + ":" + minutes;
        var attendance_start_state = "";

        if (timeDetail?.start_time < attendance_start_time) {
            attendance_start_state = "지각";
        } else {
            attendance_start_state = "정상";
        }

        const data = {
            attendance_start_date: attendance_start_date,
            attendance_start_time: attendance_start_time,
            attendance_start_state: attendance_start_state,
        }
        console.log(data)
        dispatch({
            type: ATTENDANCESTART_REGISTER_REQUEST,
            data: data
        });
    }

    const [attendanceStartssss, setAttendanceStart] = useState(true)

    const leaveWork = () => {
        const attendance_end_date = year + "-" + month + "-" + date;
        const attendance_end_time = hours + ":" + minutes;

        var attendance_end_state = "퇴근";

        // if (timeDetail?.end_time < attendance_end_time) {
        //     attendance_end_state = "지각";
        // } else {
        //     attendance_end_state = "정상";
        // }

        const data = {
            attendance_end_date: attendance_end_date,
            attendance_end_time: attendance_end_time,
            attendance_end_state: attendance_end_state,
            user_code: attendanceStartNewOne.user_code,
            attendance_start_id: attendanceStartNewOne.attendance_start_id,
        }
        console.log(data)
        dispatch({
            type: ATTENDANCEEND_TIME_REQUEST,
            data: data
        });
    };
    //✅함수

    //✅데이터
    const { timeDetail } = useSelector((state) => state.time);

    const attendanceStartNewOneRequest = () => {

        dispatch({
            type: ATTENDANCESTART_NEW_ONE_REQUEST,
        });

    };
    const { attendanceStartNewOne } = useSelector((state) => state.attendanceStart);


    if (attendanceStartNewOne) {
        console.log(attendanceStartNewOne)
    }

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

    useEffect(() => {
        // today();
        timeDetailLoding();
        workNewOneLoding();
        attendanceStartNewOneRequest();
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

                <div className='work_time_option'>
                    <div className="work_time_left">
                        <p className='title_a'>출근</p>
                        <p className='title'>출근날짜</p>
                        <p className='content'>{attendanceStartNewOne?.attendance_start_date}</p>
                        <p className='title'>출근시간</p>
                        <p className='content'>{attendanceStartNewOne?.attendance_start_time}</p>
                    </div>
                </div>
                <div className='work_time_option'>
                    <div className="work_time_mid">
                        <p className='title'>출근시간</p>
                        <p className='content'>{timeDetail?.start_time}</p>
                        <p className='title'>퇴근시간</p>
                        <p className='content'>{timeDetail?.end_time}</p>
                        <p className='title'>휴게시간</p>
                        <p className='content'>{timeDetail?.rest_start_time} ~ {timeDetail?.rest_end_time}</p>
                    </div>
                </div>
                <div className='work_time_option'>
                    <div className="work_time_left">
                        <p className='title_a'>퇴근</p>
                        <p className='title'>퇴근날짜</p>
                        <p className='content'>{attendanceStartNewOne?.attendance_end?.attendance_end_date}</p>
                        <p className='title'>퇴근시간</p>
                        <p className='content'>{attendanceStartNewOne?.attendance_end?.attendance_end_time}</p>
                    </div>
                </div>

                {/* <div className="work_time_option">
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
                {
                    attendanceStartNewOne ? (
                        <>
                            <div className="work_time_option">
                                <p>상태</p>
                                <p>출근</p>
                                <p>퇴근</p>
                            </div>
                            <div className="work_time_option">
                                <p className='working'>{attendanceStartNewOne?.attendance_start_state}</p>
                                <p>{attendanceStartNewOne?.attendance_start_date}</p>
                                <p>{attendanceStartNewOne?.attendance_start_time}</p>
                            </div>
                            <div className="work_time_option">
                                <p className='working'>{attendanceStartNewOne?.attendance_end.attendance_end_state}</p>
                                <p>{attendanceStartNewOne?.attendance_end.attendance_end_date}</p>
                                <p>{attendanceStartNewOne?.attendance_end.attendance_end_time}</p>
                            </div>
                        </>
                    ) : (
                        <></>
                    )
                } */}

            </div>
            <div className='button_section'>
                <div className='buttons'>
                    <button disabled={!attendanceStartNewOne?.attendance_end && attendanceStartNewOne} onClick={() => {
                        attendance();
                    }}>
                        출근
                    </button>
                    <button disabled={attendanceStartNewOne?.attendance_end || !attendanceStartNewOne} onClick={() => {
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
