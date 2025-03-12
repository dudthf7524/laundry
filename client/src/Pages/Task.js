import React, { useState, useEffect } from 'react';
import { ReactComponent as Icon1 } from '../Assets/Images/star.svg';
import '../css/task.css';
import BottomBar from '../Components/BottomBar';
import { useDispatch, useSelector } from 'react-redux';
import { USER_PROCESS_ONE_LIST_REQUEST } from '../reducers/userProcess';
import { TASK_REGISTER_REQUEST } from '../reducers/task';
import { TASK_NEW_ONE_REQUEST } from '../reducers/task';


const TaskPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const { userProcessOneLists } = useSelector((state) => state.userProcess);
    const { taskNewOne } = useSelector((state) => state.task);
    const taskOne = taskNewOne || null;  // 데이터가 배열이라면 첫 번째 항목을 가져옵니다.



    console.log(taskNewOne)
    const todayDate = new Date();
    const formattedDate = todayDate.toISOString().split("T")[0];


    useEffect(() => {
        userProcessOneList();
        taskNew()
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

    const taskNew = () => {
        dispatch({
            type: TASK_NEW_ONE_REQUEST,
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
        console.log(selectedProcess)
        setIsModalOpen(true);
    };

    const handleStartConfirm = () => {
        setStartTime(getFormattedTime(new Date()));
        setEndTime(null);
        setTotalWorkTime(null);
        console.log(startTime)
        console.log(selectedProcess.user_process_count)
        console.log(selectedProcess.process.process_code)
        console.log(formattedDate)

        const data = {
            task_count: selectedProcess.user_process_count,
            task_start_time: startTime,
            process_code: selectedProcess.process.process_code,
            task_date: formattedDate,
        };


        dispatch({
            type: TASK_REGISTER_REQUEST,
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

    const handleEndConfirm = () =>{
        console.log(endTime)
        console.log(totalWorkTime)
        console.log(totalCount)
        console.log(taskOne.task_id)
        
        alert('aaa')

    }

    


    


    // 업무 종료 버튼 클릭 시
    const handleEnd = () => {
        // if (!selectedProcess) {
        //     alert('업무공정을 선택해주세요');
        //     return;
        // } else if (!startTime) {
        //     alert('업무시작을 클릭해주세요');
        //     return;
        // }

        const now = new Date();
        setEndTime(getFormattedTime(now));

        // 업무 시간 계산
        const [startH, startM] = startTime.split(":").map(Number);
        const startDate = new Date();
        startDate.setHours(startH, startM, 0, 0);

        const workDuration = now - startDate; // 밀리초 단위 차이
        const hours = Math.floor(workDuration / (1000 * 60 * 60));
        const minutes = Math.floor((workDuration % (1000 * 60 * 60)) / (1000 * 60));

        setTotalWorkTime(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`);
        setTotalCount(taskOne.task_count)
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

    console.log(totalCount)
    return (
        <div className='task'>
            <div></div>
            <div className="notice">
                <Icon1 className="icon" />
                <p>안녕하세요 <span className='user_name'>{user?.user_name}</span>님! 오늘 하루도 화이팅!</p>
            </div>
            <div className="worker_select">
                {/* 옵션 선택 드롭다운 */}
                <select
                    className='select_one'
                    onChange={handleChange}
                >

                    {
                        taskOne ? (
                            <option value="current">
                                {taskOne.process.process_name} - {taskOne.task_state}
                            </option>
                        ) : (
                            <>
                                <option>업무공정을 선택해주세요</option>
                                {
                                    userProcessOneLists?.map((userProcessOneList, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {userProcessOneList.process.process_name}
                                            </option>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </select>

                {
                    taskOne ? (
                        <div className='select_two'>
                            <div>
                                총 {taskOne.task_count}벌
                            </div>
                            <div>
                                평균 {taskOne.process.hour_average}벌 / 시간 당
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                }

                {selectedProcess && (
                    <div className='select_two'>
                        <div>
                            총 {selectedProcess.user_process_count}벌
                        </div>
                        <div>
                            평균 {selectedProcess.process.hour_average}벌 / 시간 당
                        </div>
                    </div>
                )}
                {/* <div className="select_three">
                    <button>QR촬영</button>
                    <button>선택</button>
                </div> */}
            </div>
            <div className="work_time">
                <div className="work_process_time">
                    <div className="work_time_one">
                        <div>업무시간</div>
                        <div>시작시간 {startTime}&nbsp;</div>
                        <div>종료시간 {endTime}&nbsp;</div>

                    </div>
                    <div className="work_time_two">
                        <div>총 업무시간</div>
                        <div>{totalWorkTime}</div>
                    </div>
                </div>
                <div className="work_time_button">
                    <button onClick={handleStart} disabled={taskOne}>업무시작</button>
                    <button onClick={handleEnd} disabled={!startTime || isModalOpen || !taskOne}>
                        업무종료</button>
                </div>
            </div>
            <div>오늘 업무 총평: 참 잘했어요</div>
            <BottomBar />
            {isModalOpen && (
                <div className="modal">
                    <div className="modal_content">
                        <p>업무를 시작하시겠습니까?</p>
                        <button onClick={handleStartConfirm}>업무시작</button>
                        <button onClick={handleStartClose}>닫기</button>
                    </div>
                </div>
            )}
            {isEndModalOpen && (
                <div className="modal">
                    <div className="modal_content">
                        <p>업무를 종료하시겠습니까?</p>
                        <p>총 수량: <input type="number" value={totalCount} onChange={(e) => setTotalCount(e.target.value)} /> 벌</p>
                        <p>총 업무 시간: {totalWorkTime}</p>
                        {totalCount}
                        {totalCount && totalCount > 0 ? (
                            <>
                                <p>시간당 작업량: {hourlyRate} 벌</p>
                                <p>분당 작업량: {minuteRate} 벌</p>
                            </>
                        ) : (
                            <></>
                        )}

                        {   
                            !totalCount ? (
                                <p></p>
                            ) : taskOne.process.hour_average > hourlyRate ? (
                                <p>분발하세요</p>
                            ) : (
                                <p>잘하네요</p>
                            )
                        }
                        <button onClick={handleEndConfirm}>업무종료</button>
                        <button onClick={handleEndClose}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
