const { userProcess } = require("../models");

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


module.exports = {
    userProcessRegister,

};