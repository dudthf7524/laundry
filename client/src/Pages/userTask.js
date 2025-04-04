import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TASKSTART_TODAY_REQUEST } from '../reducers/taskStart';

const UserTask = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        taskToday();
    }, []);

    const taskToday = () => {
        dispatch({
            type: TASKSTART_TODAY_REQUEST,
        });
    };

    const { taskStartToday } = useSelector((state) => state.taskStart);

    return (
        <div className="flex flex-col items-center w-full h-screen p-[2vw] box-border overflow-y-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-4">업무 기록</h2>
            {taskStartToday && taskStartToday.length > 0 ? (
                taskStartToday.map(task => (
                    <div key={task.task_start_id} className="p-4 border rounded-lg bg-gray-50 w-full ">
                        <h3 className="text-md font-semibold mb-2">{task.process.process_name}</h3>
                        <p><span className="font-medium">업무 시작 날짜:</span> {task.task_start_date}</p>
                        <p><span className="font-medium">업무 시작 시간:</span> {task.task_start_time}</p>
                        <p><span className="font-medium">업무 종료 날짜:</span> {task.task_end?.task_end_date || "진행 중"}</p>
                        <p><span className="font-medium">업무 종료 시간:</span> {task.task_end?.task_end_time || "진행 중"}</p>
                    </div>
                ))
            ) : (
                <p>오늘 진행중인 업무가 없습니다.</p>
            )}
        </div>
    );
};

export default UserTask;