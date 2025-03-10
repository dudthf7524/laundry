const { time } = require("../models");


const timeRegister = async (data) => {
    console.log(data)
    try {
        const result = await time.create({
            user_code: data.user_code,
            start_time: data.start_time,
            end_time: data.end_time,
            rest_start_time: data.rest_start_time,
            rest_end_time:  data.rest_end_time,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }

};

module.exports = {
    timeRegister,

};