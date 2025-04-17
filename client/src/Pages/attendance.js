import React, { useState, useEffect } from 'react';
import '../css/attendance.css';
import { useDispatch, useSelector } from 'react-redux';
import { TIME_DETAIL_REQUEST } from '../reducers/time';
import { ATTENDANCESTART_NEW_ONE_REQUEST, ATTENDANCESTART_REGISTER_REQUEST, ATTENDANCESTART_TODAY_REQUEST } from '../reducers/attendanceStart';
import { ATTENDANCEEND_TIME_REQUEST } from '../reducers/attendanceEnd';
import MyLocation from './myLocation';
import { NOTICE_LIST_REQUEST } from '../reducers/notice';
import Today from './today';


const Attendance = () => {
    //✅정의
    const dispatch = useDispatch();
    const [currentTime] = useState(new Date());
    const [isWithinRadius, setIsWithinRadius] = useState(false); // 근무지 반경 내 여부

    // 날짜 포맷팅
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
    const date = String(currentTime.getDate()).padStart(2, '0');
    // 시간 포맷팅
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');

    const { noticeLists } = useSelector((state) => state.notice);

    useEffect(() => {
        dispatch({ type: NOTICE_LIST_REQUEST });
    }, [dispatch]);

    const attendance = () => {
        if (!timeDetail) {
            alert('지정된 출근/퇴근 시간이 존재하지 않습니다.\n관리자에게 문의 해주세요.');
            return;
        }

        if (attendanceStartToday?.attendance_start_date) {
            alert('이미 출근 기록이 존재합니다.');
            return;
        }

        if (!isWithinRadius) {
            alert('근무지 반경 외부입니다. 출근할 수 없습니다.');
            return;
        }

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
            start_time: timeDetail.start_time,
            rest_start_time: timeDetail.rest_start_time,
            rest_end_time: timeDetail.rest_end_time,

        }
        dispatch({
            type: ATTENDANCESTART_REGISTER_REQUEST,
            data: data
        });
    }

    const leaveWork = () => {
        if (!timeDetail) {
            alert('지정된 출근/퇴근 시간이 존재하지 않습니다.\n관리자에게 문의 해주세요.');
            return;
        }
        if (!isWithinRadius) {
            alert('근무지 반경 외부입니다. 퇴근할 수 없습니다.');
            return;
        }
        const attendance_end_date = year + "-" + month + "-" + date;
        const attendance_end_time = hours + ":" + minutes;

        var attendance_end_state = "퇴근";

        const data = {
            attendance_end_date: attendance_end_date,
            attendance_end_time: attendance_end_time,
            attendance_end_state: attendance_end_state,
            end_time: timeDetail.end_time,
            user_code: attendanceStartToday.user_code,
            attendance_start_id: attendanceStartToday.attendance_start_id,
        }

        dispatch({
            type: ATTENDANCEEND_TIME_REQUEST,
            data: data
        });
    };

    const { timeDetail } = useSelector((state) => state.time);

    // const attendanceStartNewOneRequest = () => {

    //     dispatch({
    //         type: ATTENDANCESTART_NEW_ONE_REQUEST,
    //     });

    // };
    // const { attendanceStartNewOne } = useSelector((state) => state.attendanceStart);

    useEffect(() => {
        attendanceToday();
    }, []);

    const attendanceToday = () => {
        dispatch({
            type: ATTENDANCESTART_TODAY_REQUEST,
        });
    };

    const { attendanceStartToday } = useSelector((state) => state.attendanceStart);


    const timeDetailLoding = () => {
        dispatch({
            type: TIME_DETAIL_REQUEST,
        });
    };


    //✅데이터

    useEffect(() => {
        timeDetailLoding();
        // attendanceStartNewOneRequest();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    const openNoticeModal = () => {
        setIsNoticeModalOpen(true);
    }

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeNoticeModal = () => {
        setIsNoticeModalOpen(false);
    };
    return (
        <div className='attendance'>
            <div className="notice cursor-pointer" onClick={openNoticeModal}>
                <div className="w-5 h-5 cursor-pointer"><img src={`${process.env.PUBLIC_URL}/icon/star.png`} alt="Map Icon" />
                </div>
                <p>{noticeLists?.notice_title}</p>
            </div>

            <Today />

            <div className="w-10 h-10 cursor-pointer" onClick={openModal}><img src={`${process.env.PUBLIC_URL}/icon/map.png`} alt="Map Icon" />
            </div>
            나의 위치 찾기
            {isModalOpen && (
                <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[9999]">
                    <div className="w-4/5 modal-content bg-white rounded-lg p-6 shadow-lg">
                        <MyLocation setIsWithinRadius={setIsWithinRadius} closeModal={closeModal} />
                    </div>
                </div>
            )}

            {isNoticeModalOpen && (
                <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[9999]">
                    <div className="w-4/5 modal-content bg-white rounded-lg p-6 shadow-lg">
                        <label className="block text-xl font-medium text-gray-700 mb-1">공지 내용</label>
                        <textarea
                            name="notice_content"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            rows="6"
                            value={noticeLists?.notice_content}
                            placeholder="공지사항 내용을 입력하세요"
                        ></textarea>
                        <button
                            onClick={closeNoticeModal}
                            className="w-full mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
            

            <div className="work_time_container">
                <div className="work_time_box">
                    <div className="work_time_title">&nbsp;</div>
                    <div className="work_time_title">출근날짜</div>
                    <div className="work_time_content">{attendanceStartToday?.attendance_start_date || '출근날짜 미정'}</div>
                    <div className="work_time_title">출근시간</div>
                    <div className="work_time_content">{attendanceStartToday?.attendance_start_time || '출근시간 미정'}</div>
                    <div className="work_time_title">&nbsp;</div>
                </div>
                <div className="work_time_box">
                    <div className="work_time_title">출근시간</div>
                    <div className="work_time_content">{timeDetail?.start_time || '출근시간 미정'}</div>
                    <div className="work_time_title">퇴근시간</div>
                    <div className="work_time_content">{timeDetail?.end_time || '퇴근시간 미정'}</div>
                    <div className="work_time_title">휴게시간</div>
                    <div className="work_time_content">{timeDetail?.rest_start_time || '휴게시작시간 미정'} ~ {timeDetail?.rest_end_time || '휴게종료시간 미정'}</div>
                </div>
                <div className="work_time_box">
                    <div className="work_time_title">&nbsp;</div>
                    <div className="work_time_title">퇴근날짜</div>
                    <div className="work_time_content">{attendanceStartToday?.attendance_end?.attendance_end_date || '퇴근날짜 미정'}</div>
                    <div className="work_time_title">퇴근시간</div>
                    <div className="work_time_content">{attendanceStartToday?.attendance_end?.attendance_end_time || '퇴근시간 미정'}</div>
                    <div className="work_time_title">&nbsp;</div>
                </div>
            </div>

            <div className="work_time_buttons">
                <button disabled={!attendanceStartToday?.attendance_end && attendanceStartToday} onClick={() => {
                    attendance();
                }}>
                    출근
                </button>
                <button disabled={attendanceStartToday?.attendance_end || !attendanceStartToday} onClick={() => {
                    leaveWork();
                }}>
                    퇴근
                </button>
            </div>
        </div>
    );
}

export default Attendance;
