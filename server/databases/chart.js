const { attendanceStart, attendanceEnd, user } = require("../models");
const { Op, Sequelize } = require("sequelize");

const chartDate = async (data) => {
  
    console.log(data)
    try {
        const attendanceData = await attendanceStart.findAll({
            attributes: [
                "attendance_start_date",
                [Sequelize.col("User.user_name"), "user_name"],
                [Sequelize.col("User.user_position"), "user_position"],
                [
                    Sequelize.literal(`
                LPAD(FLOOR(SUM(TIMESTAMPDIFF(SECOND, 
                  CONCAT(attendance_start_date, ' ', attendance_start_time), 
                  CONCAT(attendance_end.attendance_end_date, ' ', attendance_end.attendance_end_time))) / 3600), 2, '0')
              `),
                    "sum_hour",
                ],
                [
                    Sequelize.literal(`
                LPAD(FLOOR((SUM(TIMESTAMPDIFF(SECOND, 
                  CONCAT(attendance_start_date, ' ', attendance_start_time), 
                  CONCAT(attendance_end.attendance_end_date, ' ', attendance_end.attendance_end_time))) % 3600) / 60), 2, '0')
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
                user_code: data.user_code,
            },
            group: ["attendance_start_date", "User.user_code"],
            order: [
                ["attendance_start_date", "ASC"],
                [Sequelize.col("User.user_name"), "ASC"],
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
};