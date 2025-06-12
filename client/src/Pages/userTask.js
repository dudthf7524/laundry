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

    console.log(taskStartSearch)
    const searchDataChange = (e) => {
        setSearchDate(e.target.value);
    };


    const calculateDifference = (actual, expected) => {
        if (actual === null || expected === null) return '업무 중'; // 값이 없을 경우
        const difference = (actual - expected).toFixed(2);
        if (difference > 0) {
            return <span className="text-green-500">{difference} ↑</span>; // 초과 시 초록색
        } else if (difference < 0) {
            return <span className="text-red-500">{difference} ↓</span>; // 부족 시 빨간색
        }
        return <span className="text-gray-500">↔</span>; // 동일할 경우
    };

    const calculatePercentageDifference = (actual, expected) => {
        if (!actual || !expected) return '업무 중'; // 값이 없거나 null일 경우 처리

        const percentage = ((actual / expected) * 100).toFixed(1);

        if (percentage > 100) {
            return <span className="text-green-500">{percentage}% ↑</span>; // 초과
        } else if (percentage < 100) {
            return <span className="text-red-500">{percentage}% ↓</span>; // 미달
        }
        return <span className="text-gray-500">100% ↔</span>; // 동일
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
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {task.task_start_date}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">업무 시작 시간</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {task.task_start_time}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">업무 종료 날짜</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {task.task_end?.task_end_date || "업무 중"}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">업무 종료 시간</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {task.task_end?.task_end_time || "업무 중"}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">수행개수</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {task.task_end?.total_count || "업무 중"}
                            </div>
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">총 소요 시간</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {task.sum_hour}:{task.sum_minute}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">실제 시간당 개수</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {task.avg_count_per_hour}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">지정 시간당 개수</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {task.task_end?.hour_average}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">평균대비</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {calculateDifference(task.avg_count_per_hour, task.task_end?.hour_average)}
                            </div>
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">평균대비(%)</label>
                            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                                {calculatePercentageDifference(task.avg_count_per_hour, task.task_end?.hour_average)}
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