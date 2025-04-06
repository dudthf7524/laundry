const { attendanceStart, attendanceEnd, user } = require("../models");
const { Op, Sequelize, col, fn, literal } = require("sequelize");

const chartLateDate = async (data) => {
    try {
        const result = await attendanceStart.findAll({
            attributes: [
                [Sequelize.col("attendance_start_date"), "date"],
                [Sequelize.col("user.user_name"), "user_name"],
                [Sequelize.col("user.user_code"), "user_code"],
                [fn("COUNT", literal("CASE WHEN attendance_start_state = '지각' THEN 1 END")), "late_count"]
            ],
            include: [
                {
                    model: user,
                    attributes: [],
                    required: true,
                }
            ],
            where: {
                attendance_start_date: {
                    [Op.between]: [data.startDate, data.endDate]
                }
            },
            group: ["date", "user.user_code"],
            order: [
                ["date", "ASC"],
                [col("user.user_name"), "ASC"]
            ],
        });

        return result;
    } catch (error) {
        console.error(error);
    }

};


const chartLateMonth = async (data) => {
    try {
        const result = await attendanceStart.findAll({
            attributes: [
                [fn("DATE_FORMAT", col("attendance_start_date"), "%Y-%m"), "date"], // ✅ 연-월 형식 변환
                [col("user.user_name"), "user_name"], // ✅ user 테이블에서 user_name 가져오기
                [col("user.user_code"), "user_code"],
                [fn("COUNT", literal("CASE WHEN attendance_start_state = '지각' THEN 1 END")), "late_count"] // ✅ 지각 횟수 계산
            ],
            include: [
                {
                    model: user,
                    attributes: ["user_name", "user_code"], // ✅ user 테이블에서 가져올 필드 추가!
                    required: true
                }
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("SUBSTRING", Sequelize.col("attendance_start_date"), 1, 7),
                        { [Op.between]: [data.startDate, data.endDate] }
                    ),
                ],
            },
            group: ["date", "user.user_code"],
            order: [
                [literal("date"), "ASC"],
                [col("user.user_name"), "ASC"]
            ],
        });
        return result;
    } catch (error) {
        console.error(error);
    }

};

const chartLateYear = async (data) => {
    try {
        const result = await attendanceStart.findAll({
            attributes: [
                [fn("DATE_FORMAT", col("attendance_start_date"), "%Y"), "date"], // ✅ 연-월 형식 변환
                [col("user.user_name"), "user_name"], // ✅ user 테이블에서 user_name 가져오기
                [col("user.user_code"), "user_code"],
                [fn("COUNT", literal("CASE WHEN attendance_start_state = '지각' THEN 1 END")), "late_count"] // ✅ 지각 횟수 계산
            ],
            include: [
                {
                    model: user,
                    attributes: ["user_name", "user_code"], // ✅ user 테이블에서 가져올 필드 추가!
                    required: true
                }
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("SUBSTRING", Sequelize.col("attendance_start_date"), 1, 4),
                        { [Op.between]: [data.startYear, data.endYear] }
                    ),
                ],
            },
            group: ["date", "user.user_code"],
            order: [
                [literal("date"), "ASC"],
                [col("user.user_name"), "ASC"]
            ],
        });
        return result;
    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    chartLateDate,
    chartLateMonth,
    chartLateYear,
};