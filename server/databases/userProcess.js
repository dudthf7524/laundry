const { userProcess } = require("../models");
const { process } = require("../models");

const userProcessRegister = async (data) => {
    try {
        const result1 = await userProcess.findOne({
            attributes: ["user_process_code"],
            where: { user_code: data.user_code, user_process_code: data.user_process_code },
        });

        if (result1) {
            return -1;
        } else {
            const result = await userProcess.create({
                user_code: data.user_code,
                user_process_code: data.user_process_code,
                user_process_count: data.user_process_count,
                raw: true
            });
            return result;
        }
    } catch (error) {
        console.error(error)
    }
};

const userProcessList = async () => {
    try {
        const result = await userProcess.findAll({
            attributes: ['user_process_id', 'user_process_count', 'user_code'],
            include: [
                {
                    model: process,
                    attributes: ['process_name'], // work_pattern 테이블에서 필요한 컬럼 선택
                    required: true,
                },
            ],
        });

        return result;

    } catch (error) {
        console.error(error)
    }
};


const userProcessOneList = async (user_code) => {
    try {
        const result = await userProcess.findAll({
            attributes: ["user_process_count"],
            include: [
                {
                    model: process,
                    attributes: ["process_code", "process_name", "hour_average"],
                    required: true,
                },
            ],
            where: { user_code: user_code },
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const userProcessDelete = async (data) => {
    try {
        const result = await userProcess.destroy({
            where: { user_process_id: data.user_process_id },
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const userProcessUpdate = async (data) => {
    try {
        const result = await userProcess.update(
            {
                user_process_count: data.user_process_count,
            },

            {
                where: {
                    user_process_id: data.user_process_id,
                    user_code: data.user_code,
                },
            },

        )
        return result;

    } catch (error) {
        console.error(error);
    }
};

const userProcessDetail = async (user_code, process_code) => {
    try {
        const result = await userProcess.findOne({
            attributes: ["user_process_count"],
            where: { user_code: user_code, user_process_code: process_code },
        });
        return result
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    userProcessRegister,
    userProcessOneList,
    userProcessList,
    userProcessDelete,
    userProcessUpdate,
    userProcessDetail,
};