const { attendanceEnd } = require("../models");

const attendanceEndRegister = async (data) => {
    console.log(data)

    try {
        const result = await attendanceEnd.create({
            attendance_end_date: data.attendance_end_date,
            attendance_end_time: data.attendance_end_time,
            attendance_end_state: data.attendance_end_state,
            user_code: data.user_code,
            end_time : data.end_time,
            attendance_start_id: data.attendance_start_id,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    attendanceEndRegister,

};