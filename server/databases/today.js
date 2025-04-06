const { format } = require("date-fns");
const { attendanceStart } = require("../models");
const { attendanceEnd } = require("../models");
const { taskStart } = require("../models");
const { taskEnd } = require("../models");

const today = format(new Date(), 'yyyy-MM-dd');

const todayAttendance = async () => {

    try {
        const result = await attendanceStart.findAll({
            where: {
                attendance_start_date: today,
            },
            include: [
                {
                    model: attendanceEnd,
                    required: false, // 퇴근 데이터가 없어도 출근 데이터만 가져오기

                }
            ],
            order: [['attendance_start_id', 'DESC']],

        });
        return result;
    } catch (error) {
        console.error(error);
    }

};

const todayTask = async () => {
    try {
        const result = await taskStart.findAll({
            where: {
                task_start_date: today,
            },
            include: [
                {
                    model: taskEnd,
                    required: false, // 퇴근 데이터가 없어도 출근 데이터만 가져오기

                }
            ],
            order: [['task_start_id', 'DESC']],
        });
        return result;
    } catch (error) {
        console.error(error);
    }

};


module.exports = {
    todayAttendance,
    todayTask,

};