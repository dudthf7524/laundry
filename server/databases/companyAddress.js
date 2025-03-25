const { companyAddress } = require("../models");


const companyRegister = async (data) => {
    try {
        const result = await companyAddress.create({
            address: data.address,
            location_latitude: data.location_latitude,
            location_hardness: data.location_hardness,
            radius: data.radius,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const companyList = async () => {
    try {
        const result = await companyAddress.findOne({
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};


module.exports = {
    companyRegister,
    companyList,

};