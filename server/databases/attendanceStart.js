const { Op } = require("sequelize");
const { attendanceStart } = require("../models");
const { attendanceEnd } = require("../models");

const attendanceStartRegister = async (data, user_code) => {
    console.log(data)
    console.log(user_code)

    try {
        const result = await attendanceStart.create({
            attendance_start_date: data.attendance_start_date,
            attendance_start_time: data.attendance_start_time,
            attendance_start_state: data.attendance_start_state,
            user_code: user_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const attendanceStartNewOne = async (user_code) => {

    try {
        const result = await attendanceStart.findOne({
            where: {
                user_code: user_code,
            },
            include: [
                {
                    model: attendanceEnd,
                    required: false, // 퇴근 데이터가 없어도 출근 데이터만 가져오기
                    
                }
            ],
            order: [['attendance_start_id', 'DESC']],
          
        });
        console.log("출근에대한 퇴근데어터 여부 ", result)
        return result;
    } catch (error) {
        console.error(error);
    }

};

const workEndTimeUpdate = async (data) => {
    try {
        const result = await work.update(
            {
                work_end_time: data.work_end_time,
                work_state: "퇴근"
            },
            {
                where: {
                    work_id: data.work_id
                }
            }
        );
        return result;
    } catch (error) {
        console.error(error)
    }

};

module.exports = {
    attendanceStartRegister,
    attendanceStartNewOne,
    workEndTimeUpdate,
};