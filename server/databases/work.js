const { Op } = require("sequelize");
const { work } = require("../models");

const workRegister = async (data, user_code) => {
    console.log(data)
    console.log(user_code)

    try {
        const result = await work.create({
            work_date: data.work_date,
            work_start_time: data.work_attendance_time,
            work_end_time: "",
            work_state: data.work_state,
            user_code: user_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const workNewOne = async (user_code) => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10);
    try {
        const result = await work.findOne({
            where: {
                user_code: user_code,
                work_date: formattedDate,
                work_state: { [Op.ne]: "퇴근" }
            },
            order: [['work_id', 'DESC']],
        });
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
    workRegister,
    workNewOne,
    workEndTimeUpdate,
};