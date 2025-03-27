const { process } = require("../models");

const processList = async () => {
    try {
        const result = await process.findAll({
            raw: true
        })
        return result;
    } catch (error) {
        console.error(error)
    }

};

const processUpdate = async (data) => {
    try {
        const result = await process.update(
            {
                process_name: data.process_name, 
                hour_average: data.hour_average, 
               
            },
            {
                where: {
                    process_code: data.process_code,
                },
            },

        )
        return result;

    } catch (error) {
        console.error(error);
    }
};
module.exports = {
    processList,
    processUpdate,

};