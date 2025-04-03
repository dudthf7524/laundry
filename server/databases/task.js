const { task } = require("../models");
const { process } = require("../models");

const taskRegister = async (data, user_code) => {

    try {
        const result = await task.create({
            task_count: data.task_count,
            task_start_time: data.task_start_time,
            process_code: data.process_code,
            task_date: data.task_date,
            user_code: user_code,
            task_state: '업무중',
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
    taskRegister,
    taskNewOne,

};