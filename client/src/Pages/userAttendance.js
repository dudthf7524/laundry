import { useDispatch, useSelector } from "react-redux";
import { ATTENDANCESTART_TODAY_REQUEST } from "../reducers/attendanceStart";
import { useEffect } from "react";

const UserAttendance = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        attendanceToday();
    }, []);

    const attendanceToday = () => {
        dispatch({
            type: ATTENDANCESTART_TODAY_REQUEST,
        });
    };

    const { attendanceStartToday } = useSelector((state) => state.attendanceStart);

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
            <h2 className="text-lg font-medium text-gray-900 mb-4">출근/퇴근 기록</h2>

            {/* 출근 정보 */}
            <div className="p-4 border rounded-lg bg-gray-50 w-full ">
                <h3 className="text-xl font-semibold mb-2">출근 정보</h3>
                <p><span className="font-medium">출근 날짜:</span> {attendanceStartToday?.attendance_start_date || "미등록"}</p>
                <p><span className="font-medium">출근 시간:</span> {attendanceStartToday?.attendance_start_time || "미등록"}</p>
            </div>

            {/* 퇴근 정보 */}
            <div className="p-4 border rounded-lg bg-gray-50 w-full ">
                <h3 className="text-xl font-semibold mb-2">퇴근 정보</h3>
                <p><span className="font-medium">퇴근 날짜:</span> {attendanceStartToday?.attendance_end?.attendance_end_date || "미등록"}</p>
                <p><span className="font-medium">퇴근 시간:</span> {attendanceStartToday?.attendance_end?.attendance_end_time || "미등록"}</p>
            </div>

            {/* 근무 시간 & 상태 */}
            <div className="p-4 border rounded-lg bg-gray-50 w-full">
                <h3 className="text-xl font-semibold mb-2">근무 상태</h3>
                <p><span className="font-medium">근무 시간:</span> {calculateWorkDuration(
                    attendanceStartToday?.attendance_start_date,
                    attendanceStartToday?.attendance_start_time,
                    attendanceStartToday?.attendance_end?.attendance_end_date,
                    attendanceStartToday?.attendance_end?.attendance_end_time
                )}</p>
                <p><span className="font-medium">상태:</span> {attendanceStartToday?.attendance_start_state || "미등록"}</p>
            </div>
        </div>
    );
};

export default UserAttendance;
