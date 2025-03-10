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


module.exports = {
    processList,

};