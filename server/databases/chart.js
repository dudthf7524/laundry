const { attendanceStart, attendanceEnd, user } = require("../models");
const { Op, Sequelize } = require("sequelize");

const chartDate = async (data) => {
    try {
        const attendanceData = await attendanceStart.findAll({
            attributes: [
                [Sequelize.col("attendance_start_date"), "date"],
                [Sequelize.col("user.user_name"), "user_name"],
                [Sequelize.col("user.user_code"), "user_code"],

                // ⬇️ sum_hour: 08 → 8로 표시 (LPAD 제거)
                [
                    Sequelize.literal(`
                        FLOOR(SUM(
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end.attendance_end_date, ' ', attendance_end.attendance_end_time)
                            ) 
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time)
                            )
                        ) / 3600)
                    `),
                    "sum_hour",
                ],

                // ✅ sum_minute (총 근무 시간에서 휴식 시간 차감 후 분 단위 변환)
                [
                    Sequelize.literal(`
                        FLOOR((
                            SUM(
                                TIMESTAMPDIFF(SECOND, 
                                    CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                    CONCAT(attendance_end.attendance_end_date, ' ', attendance_end.attendance_end_time)
                                ) 
                                - TIMESTAMPDIFF(SECOND, 
                                    CONCAT(attendance_start_date, ' ', rest_start_time), 
                                    CONCAT(attendance_start_date, ' ', rest_end_time)
                                )
                            )
                        ) % 3600 / 60)
                    `),
                    "sum_minute",
                ],
            ],
            include: [
                {
                    model: attendanceEnd,
                    as: "attendance_end",
                    required: true,
                    attributes: [],
                },
                {
                    model: user,
                    required: true,
                    attributes: [],
                },
            ],
            where: {
                attendance_start_date: {
                    [Op.gte]: data.startDate, // 2024-03-24 이상
                    [Op.lte]: data.endDate,   // 2025-06-24 이하
                },
            },
            group: ["attendance_start_date", "user.user_code", "user.user_name"],
            order: [
                ["attendance_start_date", "ASC"],
                [Sequelize.col("user.user_name"), "ASC"],
            ],
        });

        return attendanceData;
    } catch (error) {
        console.error("Error fetching attendance summary:", error);
        throw error;
    }

};


const chartMonth = async (data) => {
    try {
        const attendanceData = await attendanceStart.findAll({
            attributes: [
                [Sequelize.fn("DATE_FORMAT", Sequelize.col("attendance_start_date"), "%Y-%m"), "date"],
                [Sequelize.col("user.user_name"), "user_name"],
                [Sequelize.col("user.user_code"), "user_code"],
                [
                    Sequelize.literal(`
                        FLOOR(SUM(
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end.attendance_end_date, ' ', attendance_end.attendance_end_time)
                            )
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time)
                            )
                        ) / 3600)
                    `),
                    "sum_hour",
                ],
                [
                    Sequelize.literal(`
                        FLOOR((
                            SUM(
                                TIMESTAMPDIFF(SECOND, 
                                    CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                    CONCAT(attendance_end.attendance_end_date, ' ', attendance_end.attendance_end_time)
                                )
                                - TIMESTAMPDIFF(SECOND, 
                                    CONCAT(attendance_start_date, ' ', rest_start_time), 
                                    CONCAT(attendance_start_date, ' ', rest_end_time)
                                )
                            ) % 3600
                        ) / 60)
                    `),
                    "sum_minute",
                ],
            ],
            include: [
                {
                    model: attendanceEnd,
                    as: "attendance_end",
                    required: true,
                    attributes: [],
                },
                {
                    model: user,
                    required: true,
                    attributes: [],
                },
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("SUBSTRING", Sequelize.col("attendance_start_date"), 1, 7),
                        { [Op.between]: [data.startDate, data.endDate] }
                    ),
                ],
            },
            group: ["date", "user.user_code", "user.user_name"],
            order: [
                ["date", "ASC"],
                [Sequelize.col("user.user_name"), "ASC"],
            ],
        });

        return attendanceData;
    } catch (error) {
        console.error("Error fetching attendance summary:", error);
        throw error;
    }
};

const chartYear = async (data) => {
    try {
        const attendanceData = await attendanceStart.findAll({
            attributes: [
                [Sequelize.fn("DATE_FORMAT", Sequelize.col("attendance_start_date"), "%Y"), "date"],
                [Sequelize.col("user.user_name"), "user_name"],
                [Sequelize.col("user.user_code"), "user_code"],
                [
                    Sequelize.literal(`
                        FLOOR(SUM(
                            TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                CONCAT(attendance_end.attendance_end_date, ' ', attendance_end.attendance_end_time)
                            )
                            - TIMESTAMPDIFF(SECOND, 
                                CONCAT(attendance_start_date, ' ', rest_start_time), 
                                CONCAT(attendance_start_date, ' ', rest_end_time)
                            )
                        ) / 3600)
                    `),
                    "sum_hour",
                ],
                [
                    Sequelize.literal(`
                        FLOOR((
                            SUM(
                                TIMESTAMPDIFF(SECOND, 
                                    CONCAT(attendance_start_date, ' ', attendance_start_time), 
                                    CONCAT(attendance_end.attendance_end_date, ' ', attendance_end.attendance_end_time)
                                )
                                - TIMESTAMPDIFF(SECOND, 
                                    CONCAT(attendance_start_date, ' ', rest_start_time), 
                                    CONCAT(attendance_start_date, ' ', rest_end_time)
                                )
                            ) % 3600
                        ) / 60)
                    `),
                    "sum_minute",
                ],
            ],
            include: [
                {
                    model: attendanceEnd,
                    as: "attendance_end",
                    required: true,
                    attributes: [],
                },
                {
                    model: user,
                    required: true,
                    attributes: [],
                },
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("SUBSTRING", Sequelize.col("attendance_start_date"), 1, 4),
                        { [Op.between]: [data.startYear, data.endYear] }
                    ),
                ],
            },
            group: ["date", "user.user_code", "user.user_name"],
            order: [
                ["date", "ASC"],
                [Sequelize.col("user.user_name"), "ASC"],
            ],
        });

        return attendanceData;
    } catch (error) {
        console.error("Error fetching attendance summary:", error);
        throw error;
    }
};

module.exports = {
    chartDate,
    chartMonth,
    chartYear,
};