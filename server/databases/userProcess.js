const { userProcess } = require("../models");
const { process } = require("../models");

const userProcessRegister = async (data) => {
    console.log(data)
    try {
        const result = await userProcess.create({
            user_code: data.user_code,
            user_process_code: data.user_process_code,
            user_process_count: data.user_process_count,
            raw: true
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
        console.log("result")
        console.log(result)
        console.log("result")
        return result;
    } catch (error) {
        console.error(error)
    }

};


module.exports = {
    userProcessRegister,
    userProcessOneList,

};