const { Op } = require("sequelize");
const { attendanceStart, Sequelize } = require("../models");
const { attendanceEnd } = require("../models");
const { user } = require("../models");

const attendanceStartRegister = async (data, user_code) => {

    try {
       
        const result = await attendanceStart.create({
            attendance_start_date: data.attendance_start_date,
            attendance_start_time: data.attendance_start_time,
            attendance_start_state: data.attendance_start_state,
            start_time: data.start_time,
            rest_start_time: data.rest_start_time,
            rest_end_time: data.rest_end_time,
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

        return result;
    } catch (error) {
        console.error(error);
    }

};



const attendanceStartDate = async (data) => {
    try {
        const results = await attendanceStart.findAll({
            include: [
                {
                    model: attendanceEnd,
                    required: false,
                    attributes: [
                        'attendance_end_id',
                        'attendance_end_date',
                        'attendance_end_time',
                        'attendance_end_state',
                        'end_time',
                    ],
                },
                {
                    model: user,
                    required: true,
                    attributes: ['user_code', 'user_name', 'user_position'],
                },
            ],
            where: {
                attendance_start_date: {
                    [Op.gte]: data.startDate, // 시작일 (예: 2024-03-24)
                    [Op.lte]: data.endDate,   // 종료일 (예: 2025-06-24)
                },
            },
            attributes: [
                'attendance_start_id',
                'attendance_start_date',
                'attendance_start_time',
                'attendance_start_state',
                'start_time',
                'rest_start_time',
                'rest_end_time',
                [
                    Sequelize.literal(`
                        FLOOR((
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end_date, ' ', attendance_end_time))
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time))
                        ) / 3600)
                    `),
                    'sum_hour',
                ],
                [
                    Sequelize.literal(`
                        FLOOR((
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end_date, ' ', attendance_end_time))
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time))
                        ) % 3600 / 60)
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

const attendanceStartMonth = async (data) => {
    try {
        const results = await attendanceStart.findAll({
            include: [
                {
                    model: attendanceEnd,
                    required: false,
                    attributes: ['attendance_end_id', 'attendance_end_date', 'attendance_end_time', 'attendance_end_state', 'end_time',], // ✅ 명확하게 필드 지정
                },
                {
                    model: user,
                    required: true,
                    attributes: ['user_code', 'user_name', 'user_position'], // ✅ 필요한 필드만 가져오기
                },
            ],
            where: Sequelize.literal(`SUBSTRING(attendance_start_date, 1, 7) = '${data.year}-${data.month}'`),
            attributes: [
                'attendance_start_id',
                'attendance_start_date',
                'attendance_start_time',
                'attendance_start_state',
                'start_time',
                'rest_start_time',
                'rest_end_time',
                [
                    Sequelize.literal(`
                        FLOOR((
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end_date, ' ', attendance_end_time))
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time))
                        ) / 3600)
                    `),
                    'sum_hour',
                ],
                [
                    Sequelize.literal(`
                        FLOOR((
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end_date, ' ', attendance_end_time))
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time))
                        ) % 3600 / 60)
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

const attendanceStartYear = async (data) => {
    try {
        const results = await attendanceStart.findAll({
            include: [
                {
                    model: attendanceEnd,
                    required: false,
                    attributes: ['attendance_end_id', 'attendance_end_date', 'attendance_end_time', 'attendance_end_state', 'end_time',
                    ], // ✅ 명확하게 필드 지정
                },
                {
                    model: user,
                    required: true,
                    attributes: ['user_code', 'user_name', 'user_position'], // ✅ 필요한 필드만 가져오기
                },
            ],
            where: Sequelize.literal(`SUBSTRING(attendance_start_date, 1, 4) = '${data.year}'`),
            attributes: [
                'attendance_start_id',
                'attendance_start_date',
                'attendance_start_time',
                'attendance_start_state',
                'start_time',
                'rest_start_time',
                'rest_end_time',
                [
                    Sequelize.literal(`
                        FLOOR((
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end_date, ' ', attendance_end_time))
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time))
                        ) / 3600)
                    `),
                    'sum_hour',
                ],
                [
                    Sequelize.literal(`
                        FLOOR((
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end_date, ' ', attendance_end_time))
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time))
                        ) % 3600 / 60)
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

const attendanceToday = async (user_code) => {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0'); // 두 자리로 표시
    const formattedDate = `${year}-${month}-${day}`;

    try {
        const result = await attendanceStart.findOne({
            where: {
                user_code: user_code,
                attendance_start_date: formattedDate,
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

const attendanceUpdate = async (data) => {
    try {
        await attendanceStart.update(
            {
                attendance_start_date: data.attendance_start_date,
                attendance_start_time: data.attendance_start_time,
                attendance_start_state: data.attendance_start_state,
            },

            {
                where: {
                    attendance_start_id: data.attendance_start_id,
                },
            },

        )
    } catch (error) {
        console.error(error);
    }

    try {
        const result = await attendanceEnd.update(
            {
                attendance_end_date: data.attendance_end_date,
                attendance_end_time: data.attendance_end_time,
            },
            {
                where: {
                    attendance_end_id: data.attendance_end_id,
                },
            },

        )
        return result;

    } catch (error) {
        console.error(error);
    }


};

const attendanceSearch = async (user_code, searchDate) => {

    try {
        const result = await attendanceStart.findOne({
            where: {
                user_code: user_code,
                attendance_start_date: searchDate,
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

module.exports = {
    attendanceStartRegister,
    attendanceStartNewOne,
    attendanceStartYear,
    attendanceStartMonth,
    attendanceStartDate,
    attendanceToday,
    attendanceUpdate,
    attendanceSearch,
};