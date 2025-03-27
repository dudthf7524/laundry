import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TASKSTART_TODAY_REQUEST } from '../reducers/taskStart';

const UserTask = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        taskToday()
    }, []);
    const { taskStartToday } = useSelector((state) => state.taskStart);
    const taskToday = () => {
        dispatch({
            type: TASKSTART_TODAY_REQUEST,
        });
    };
    return (
        <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">업무 기록</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-4 text-left">업무명</th>
                            <th className="border p-4 text-left">업무 시작 날짜</th>
                            <th className="border p-4 text-left">업무 시작 시간</th>
                            <th className="border p-4 text-left">업무 종료 날짜</th>
                            <th className="border p-4 text-left">업무 종료 시간</th>

                        </tr>
                    </thead>
                    <tbody>
                        {taskStartToday?.map(task => (
                            <tr key={task.task_start_id} className="border">
                                <td className="border p-4">{task.process.process_name}</td>
                                <td className="border p-4">{task.task_start_date}</td>
                                <td className="border p-4">{task.task_start_time}</td>
                                <td className="border p-4">{task.task_end.task_end_date}</td>
                                <td className="border p-4">{task.task_end.task_end_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTask;
