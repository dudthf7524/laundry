const { auth } = require("../models");


const authList = async () => {
    try {
        const result = await auth.findAll()
        return result;
    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    authList,

};