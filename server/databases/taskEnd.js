const { taskEnd } = require("../models");
const { process } = require("../models");

const taskEndRegister = async (data, user_code) => {
    try {
        const result = await taskEnd.create({
            total_count: data.task_count,
            task_end_date: data.task_end_date,
            task_end_time: data.task_end_time,
            user_code: user_code,
            hour_average :data.hour_average,
            task_start_id: data.task_start_id,
            task_end_state: '정상',
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }

};

const taskNewOne = async (user_code) => {
    try {
        const result = await task.findOne({
            where: {
                user_code: user_code,
                task_state: '업무중'
            },
            include: [{
                model: process, // process 모델을 포함
                required: true,  // 조인 방식 설정 (INNER JOIN)
                attributes: ['process_code', 'process_name', 'hour_average'],  // 필요한 속성만 포함
            }],
            order: [['task_id', 'DESC']],
        });
        return result;
    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    taskEndRegister,
    taskNewOne,
};