const { companyAddress } = require("../models");
const db = require("../models/index");

const companyRegister = async (data) => {
    try {
        const count = await db.companyAddress.count();
        if (count > 0) {
            return -1; // 데이터가 있으면 추가 작업을 하지 않음
        }
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

const companyDelete = async (data) => {
    try {
        const result = await companyAddress.destroy({
            where: { company_address_id: data.company_address_id },
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    companyRegister,
    companyList,
    companyDelete,
};