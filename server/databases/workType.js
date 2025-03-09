const { workType } = require("../models");


const workTypeRegister = async (data) => {

    try {
        const result = await workType.create({
            work_type_name: data.work_type_name,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error);
    }

};


const workTypeList = async () => {

    try {
        const result = await workType.findAll({
            raw: true
        });
       
        return result;
    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    workTypeRegister,
    workTypeList,

};