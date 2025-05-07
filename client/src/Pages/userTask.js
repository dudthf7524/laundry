import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TASKSTART_SEARCH_REQUEST, } from '../reducers/taskStart';

const UserTask = () => {
    const dispatch = useDispatch();
    const today = new Date().toISOString().split('T')[0];
    const [searchDate, setSearchDate] = useState(today);

    useEffect(() => {
        attendanceToday();
    }, [searchDate]);

    const attendanceToday = () => {

        const data = {
            searchDate: searchDate
        }

        dispatch({
            type: TASKSTART_SEARCH_REQUEST,
            data: data,
        });
    };

    const { taskStartSearch } = useSelector((state) => state.taskStart);

    console.log(taskStartSearch)
    const searchDataChange = (e) => {
        setSearchDate(e.target.value);
    };
    return (
        <div className="flex flex-col items-center gap-[3vh] w-full h-screen p-[2vw] box-border overflow-y-auto">
            <h2 className="text-lg font-medium text-gray-900">업무 기록</h2>
            <div className="p-4 border rounded-lg bg-gray-50 w-full ">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    날짜를 선택해주세요
                </label>
                <input
                    type="date"
                    id="startDate"
                    name="searchData"
                    value={searchDate}
                    onChange={searchDataChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            {taskStartSearch && taskStartSearch.length > 0 ? (
                taskStartSearch?.map(task => (
                    <div key={task.task_start_id} className="p-4 border rounded-lg bg-gray-50 w-full mb-5">
                        <h3 className="text-md font-semibold mb-2">{task.process.process_name}</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">업무 시작 날짜</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                                {task.task_start_date}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">업무 시작 시간</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                                {task.task_start_time}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">업무 종료 날짜</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                                {task.task_end?.task_end_date || "진행 중"}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">업무 종료 시간</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                                {task.task_end?.task_end_time || "진행 중"}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>오늘 진행중인 업무가 없습니다.</p>
            )}
        </div>
    );
};

export default UserTask;