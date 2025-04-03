const { companyVacation } = require("../models");
const { user } = require("../models");

const companyacationRegister = async (data) => {
  
  
    try {
        const result = await companyVacation.create({
            company_vacation_date: data.company_vacation_date,
            company_vacation_reason: data.company_vacation_reason,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }

};


const companyacationList = async () => {
    try {
        const result = await companyVacation.findAll({
        })

        return result;


    } catch (error) {
        console.error(error);
    }
};
module.exports = {
    companyacationRegister,
    companyacationList,
    
};