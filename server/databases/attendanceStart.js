const { Op } = require("sequelize");
const { attendanceStart, Sequelize } = require("../models");
const { attendanceEnd } = require("../models");
const { user } = require("../models");

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

const attendanceStartYear = async (data) => {
    console.log(data.year)


  
    try {
        const results = await attendanceStart.findAll({
            include: [
                {
                    model: attendanceEnd,
                    required: true,
                    attributes: ['attendance_end_date', 'attendance_end_time', 'attendance_end_state'], // ✅ 명확하게 필드 지정
                },
                {
                    model: user,
                    required: true,
                    attributes: ['user_name', 'user_position'], // ✅ 필요한 필드만 가져오기
                },
            ],
            where: Sequelize.literal(`SUBSTRING(attendance_start_date, 1, 4) = '${data.year}'`),
            attributes: [
                'attendance_start_date',
                'attendance_start_time',
                'attendance_start_state',
                [
                    Sequelize.literal(`
                        LPAD(FLOOR(TIMESTAMPDIFF(SECOND, CONCAT(attendance_start_date, ' ', attendance_start_time), CONCAT(attendance_end_date, ' ', attendance_end_time)) / 3600), 2, '0')
                    `),
                    'sum_hour',
                ],
                [
                    Sequelize.literal(`
                        LPAD(FLOOR((TIMESTAMPDIFF(SECOND, CONCAT(attendance_start_date, ' ', attendance_start_time), CONCAT(attendance_end_date, ' ', attendance_end_time)) % 3600) / 60), 2, '0')
                    `),
                    'sum_minute',
                ],
            ],
        });
       
        return results;
    } catch (error) {
        console.error('Error fetching attendance:', error);
        throw error;
    }

};

module.exports = {
    attendanceStartRegister,
    attendanceStartNewOne,
    attendanceStartYear,
};