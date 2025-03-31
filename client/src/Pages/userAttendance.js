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
        if (!startDate || !startTime || !endDate || !endTime) return "-";

        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        const diffMs = endDateTime - startDateTime;
        if (diffMs < 0) return "-";

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}시간 ${minutes}분`;
    };
    return (
        <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">출근/퇴근 기록</h2>
            <div className="overflow-x-auto mb-10">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">출근 날짜</th>
                            <th className="border p-3 text-left">출근 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="border p-5 w-1/2">{attendanceStartToday?.attendance_start_date}</td>
                            <td className="border p-5 w-1/2">{attendanceStartToday?.attendance_start_time}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto mb-10">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">퇴근 날짜</th>
                            <th className="border p-3 text-left">퇴근 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="border p-5 w-1/2">{attendanceStartToday?.attendance_end.attendance_end_date}</td>
                            <td className="border p-5 w-1/2">{attendanceStartToday?.attendance_end.attendance_end_time}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="overflow-x-auto mb-10">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">근무시간</th>
                            <th className="border p-3 text-left">상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="border p-5 w-1/2">
                                {calculateWorkDuration(
                                    attendanceStartToday?.attendance_start_date,
                                    attendanceStartToday?.attendance_start_time,
                                    attendanceStartToday?.attendance_end.attendance_end_date,
                                    attendanceStartToday?.attendance_end.attendance_end_time
                                )}
                            </td>
                            <td className="border p-5 w-1/2">{attendanceStartToday?.attendance_start_state}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserAttendance;