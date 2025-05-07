import { useDispatch, useSelector } from "react-redux";
import { ATTENDANCESTART_SEARCH_REQUEST, ATTENDANCESTART_TODAY_REQUEST } from "../reducers/attendanceStart";
import { useEffect, useState } from "react";

const UserAttendance = () => {
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
            type: ATTENDANCESTART_SEARCH_REQUEST,
            data: data,
        });
    };
    
   
    const { attendanceStartSearch } = useSelector((state) => state.attendanceStart);

    

    const searchDataChange = (e) => {
        setSearchDate(e.target.value);
    };

    const calculateWorkDuration = (startDate, startTime, endDate, endTime) => {
        if (!startDate || !startTime || !endDate || !endTime) return "미등록";
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        const diffMs = endDateTime - startDateTime;
        if (diffMs < 0) return "-";
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}시간 ${minutes}분`;
    };

    return (
        <div className="flex flex-col items-center gap-[3vh] w-full h-screen p-[2vw] box-border overflow-y-auto">
            <h2 className="text-lg font-medium text-gray-900">출근/퇴근 기록</h2>
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
            {/* 출근 정보 */}
            <div className="p-4 border rounded-lg bg-gray-50 w-full ">
                <h3 className="text-xl font-semibold mb-2">출근 정보</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">출근 날짜</label>
                    <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                        {attendanceStartSearch?.attendance_start_date || "미등록"}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">출근 시간</label>
                    <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                        {attendanceStartSearch?.attendance_start_time || "미등록"}
                    </div>
                </div>
            </div>

            {/* 퇴근 정보 */}
            <div className="p-4 border rounded-lg bg-gray-50 w-full ">
                <h3 className="text-xl font-semibold mb-2">퇴근 정보</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">퇴근 날짜</label>
                    <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                        {attendanceStartSearch?.attendance_end?.attendance_end_date || "미등록"}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">퇴근 시간</label>
                    <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                        {attendanceStartSearch?.attendance_end?.attendance_end_time || "미등록"}
                    </div>
                </div>
            </div>

            {/* 근무 시간 & 상태 */}
            <div className="p-4 border rounded-lg bg-gray-50 w-full">
                <h3 className="text-xl font-semibold mb-2">근무 상태</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">근무 시간</label>
                    <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                        {calculateWorkDuration(
                            attendanceStartSearch?.attendance_start_date,
                            attendanceStartSearch?.attendance_start_time,
                            attendanceStartSearch?.attendance_end?.attendance_end_date,
                            attendanceStartSearch?.attendance_end?.attendance_end_time
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1">
                        {attendanceStartSearch?.attendance_start_state || "미등록"}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserAttendance;
