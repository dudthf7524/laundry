import React, { useState, useEffect } from 'react';
import { ReactComponent as StarIcon } from '../Assets/Images/star.svg';
import '../css/task.css';
import { useDispatch, useSelector } from 'react-redux';
import { USER_PROCESS_ONE_LIST_REQUEST } from '../reducers/userProcess';
import { TASKSTART_NEW_ONE_REQUEST, TASKSTART_REGISTER_REQUEST } from '../reducers/taskStart';
import { TASKEND_REGISTER_REQUEST } from '../reducers/taskEnd';
import { format } from 'date-fns';


const Task = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const { userProcessOneLists } = useSelector((state) => state.userProcess);
    const { taskStartNewOne } = useSelector((state) => state.taskStart);

    const taskOne = null;  // 데이터가 배열이라면 첫 번째 항목을 가져옵니다.
    const today = format(new Date(), 'yyyy-MM-dd');
    const formattedDate = today;

    console.log(userProcessOneLists)

    useEffect(() => {
        userProcessOneList();
        taskStartNew();
    }, []);

    useEffect(() => {
        // taskOne이 있을 때, task_start_time을 startTime에 설정
        if (taskOne) {
            setStartTime(taskOne.task_start_time);
        } else {
            setStartTime(null);
        }
    }, [taskOne]);

    const userProcessOneList = () => {
        dispatch({
            type: USER_PROCESS_ONE_LIST_REQUEST,
        });
    };

    const taskStartNew = () => {
        dispatch({
            type: TASKSTART_NEW_ONE_REQUEST,
        });
    };

    const [selectedProcess, setSelectedProcess] = useState(null);

    console.log(selectedProcess)

    // 선택 시 데이터 업데이트
    const handleChange = (event) => {
        setStartTime(null)
        setEndTime(null)
        const selectedIndex = event.target.value;
        console.log(selectedIndex)

        setSelectedProcess(userProcessOneLists[selectedIndex]); // 선택한 데이터 저장
    };

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [totalWorkTime, setTotalWorkTime] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEndModalOpen, setIsEndModalOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(taskOne?.task_count || ""); // 총 수량 입력 필드
    const [hourlyRate, setHourlyRate] = useState(null);
    const [minuteRate, setMinuteRate] = useState(null);
    // 업무 시작 버튼 클릭 시 현재 시간 설정
    const getFormattedTime = (date) => {
        return date.getHours().toString().padStart(2, "0") + ":" +
            date.getMinutes().toString().padStart(2, "0");
    };

    // 업무 시작 버튼 클릭 시
    const handleStart = () => {
        if (!selectedProcess) {
            alert('업무공정을 선택해주세요');
            return;
        }
        setStartTime(getFormattedTime(new Date()));
        setEndTime(null);
        setTotalWorkTime(null);
        setIsModalOpen(true);
    };

    const handleStartConfirm = () => {
        setStartTime(getFormattedTime(new Date()));
        setEndTime(null);
        setTotalWorkTime(null);


        const data = {
            task_count: selectedProcess.user_process_count,
            task_start_time: startTime,
            process_code: selectedProcess.process.process_code,
            task_start_date: formattedDate,
        };


        dispatch({
            type: TASKSTART_REGISTER_REQUEST,
            data: data,
        });
        setIsModalOpen(false);
    };

    const handleStartClose = () => {
        setStartTime(null)
        setIsModalOpen(false);
    }

    const handleEndClose = () => {
        setEndTime(null)
        setTotalWorkTime(null)
        setIsEndModalOpen(false);
    }

    const handleEndConfirm = () => {
        const data = {
            task_count: totalCount,
            task_end_time: endTime,
            task_end_date: formattedDate,
            task_start_id: taskStartNewOne.task_start_id,
            hour_average: taskStartNewOne?.process.hour_average
        };
        dispatch({
            type: TASKEND_REGISTER_REQUEST,
            data: data,
        });
        setIsModalOpen(false);
    }







    // 업무 종료 버튼 클릭 시
    const handleEnd = () => {
        const now = new Date();
        setEndTime(getFormattedTime(now));

        const [startH, startM] = taskStartNewOne.task_start_time.split(":").map(Number);
        const startDate = new Date();
        startDate.setHours(startH, startM, 0, 0);

        const workDuration = now - startDate; // 밀리초 단위 차이
        const hours = Math.floor(workDuration / (1000 * 60 * 60));
        const minutes = Math.floor((workDuration % (1000 * 60 * 60)) / (1000 * 60));

        setTotalWorkTime(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`);
        setTotalCount(taskStartNewOne.task_count)
        setIsEndModalOpen(true)

    };


    useEffect(() => {
        if (totalCount && totalWorkTime) {
            const [h, m] = totalWorkTime.split(":").map(Number);
            const totalMinutes = h * 60 + m;

            if (totalMinutes > 0) {
                setHourlyRate((totalCount / (totalMinutes / 60)).toFixed(2)); // 시간당 작업량
                setMinuteRate((totalCount / totalMinutes).toFixed(2)); // 분당 작업량
            } else {
                setHourlyRate(null);
                setMinuteRate(null);
            }
        }
    }, [totalCount, totalWorkTime]);

    return (
        <div className='task'>

            <div className="notice">
                <StarIcon className="w-5 h-5" />
                <p>안녕하세요 <span className='user_name'>{user?.user_name}</span>님! 오늘 하루도 화이팅!</p>
            </div>

            <div className="worker_select">
                {/* 옵션 선택 드롭다운 */}
                <select className='select_one' onChange={handleChange}>
                    {taskStartNewOne ? (
                        !taskStartNewOne.task_end ? (
                            <option value="current">{taskStartNewOne?.process.process_name}</option>
                        ) : (
                            <>
                                <option>업무공정을 선택해주세요</option>
                                {userProcessOneLists?.map((userProcessOneList, index) => (
                                    <option key={index} value={index}>
                                        {userProcessOneList.process.process_name}
                                    </option>
                                ))}
                            </>
                        )
                    ) : <>
                        <option>업무공정을 선택해주세요</option>
                        {userProcessOneLists?.map((userProcessOneList, index) => (
                            <option key={index} value={index}>
                                {userProcessOneList.process.process_name}
                            </option>
                        ))}
                    </>}

                </select>

                {/* 선택된 업무 정보 */}
                {!taskStartNewOne ? (
                    <></>
                ) : (
                    !taskStartNewOne.task_end && (
                        <div className='select_two'>
                            <div>총 {taskStartNewOne.task_count}벌</div>
                            <div>평균 {taskStartNewOne.process?.hour_average}벌 / 시간 당</div>
                        </div>
                    )
                )}

                {/* 선택된 업무 정보 */}
                {selectedProcess && (
                    <div className='select_two'>
                        <div>총 {selectedProcess?.user_process_count}벌</div>
                        <div>평균 {selectedProcess?.process?.hour_average}벌 / 시간 당</div>
                    </div>
                )}
            </div>

            {/* 업무 시간 박스 */}
            <div className="work_time_container">
                <div className="work_time_box">
                    <div className="work_time_title">&nbsp;</div>
                    <div className="work_time_title">업무 시작 날짜</div>
                    <div className="work_time_content">{taskStartNewOne?.task_start_date || "미정"}</div>
                    <div className="work_time_title">&nbsp;</div>
                    <div className="work_time_title">업무 시작 시간</div>
                    <div className="work_time_content">{taskStartNewOne?.task_start_time || "미정"}</div>
                    <div className="work_time_title">&nbsp;</div>
                </div>
                <div className="work_time_box">
                    <div className="work_time_title">&nbsp;</div>
                    <div className="work_time_title">업무 종료 날짜</div>
                    <div className="work_time_content">{taskStartNewOne?.task_end?.task_end_date || "미정"}</div>
                    <div className="work_time_title">&nbsp;</div>
                    <div className="work_time_title">업무 종료 사간</div>
                    <div className="work_time_content">{taskStartNewOne?.task_end?.task_end_time || "미정"}</div>
                    <div className="work_time_title">&nbsp;</div>
                </div>

            </div>

            {/* 업무 시작/종료 버튼 */}
            <div className="work_time_buttons">
                <button onClick={handleStart} disabled={!taskStartNewOne?.task_end && taskStartNewOne}>업무시작</button>
                <button onClick={handleEnd} disabled={taskStartNewOne?.task_end || !taskStartNewOne}>업무종료</button>
            </div>


            {/* 업무 시작 모달 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal_content">
                        <p>업무를 시작하시겠습니까?</p>
                        <button onClick={handleStartConfirm}>업무시작</button>
                        <button onClick={handleStartClose}>닫기</button>
                    </div>
                </div>
            )}

            {/* 업무 종료 모달 */}
            {isEndModalOpen && (
                <div className="modal">
                    <div className="modal_content">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">업무종료</h1>
                        <p className="text-gray-600 mb-5">
                            업무를 종료하시겠습니까?
                        </p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">총 수량</label>
                            <input
                                type="number"
                                name="notice_title"
                                className="mb-2 w-full text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                onChange={(e) => setTotalCount(e.target.value)}
                                value={totalCount}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">총 업무 시간</label>
                            <input
                                type="text"
                                name="notice_title"
                                className="mb-2 w-full text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                readOnly
                                value={totalWorkTime || ''}
                            />
                        </div>
                        {totalCount > 0 && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">시간당 작업량</label>
                                    <input
                                        type="text"
                                        name="notice_title"
                                        className="mb-2 w-full text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={hourlyRate || ''}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">분당 작업량</label>
                                    <input
                                        type="text"
                                        name="notice_title"
                                        className="mb-2 w-full text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={minuteRate || ''}
                                        readOnly
                                    />
                                </div>
                            </>
                        )}

                        {!totalCount ? null : taskStartNewOne.process.hour_average > hourlyRate ? (
                            <>
                                <label className="block text-sm font-medium text-gray-700 mb-2">업무 상태</label>
                                <div className="mb-2 w-full text-center px-4 py-2 border border-gray-300 rounded-md text-red-500 font-bold">
                                    평균치 보다 조금 부족하군요!
                                    다음에는 속도를 더 내주세요!
                                    업무를 종료하시겠습니까?
                                </div>
                            </>
                        ) : (
                            <>
                                <label className="block text-sm font-medium text-gray-700 mb-2">업무 상태</label>
                                <div className="mb-2 w-full text-center px-4 py-2 border border-gray-300 rounded-md text-green-600 font-bold">
                                    “열심히 하고 계시군
                                    요! 다음에도 화이팅 해주세요!
                                    업무를 종료하시겠습니까?
                                </div>
                            </>
                        )}

                        <button onClick={handleEndConfirm}>업무종료</button>
                        <button onClick={handleEndClose}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
