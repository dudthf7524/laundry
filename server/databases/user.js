
const { user } = require("../models");
const { auth } = require("../models");


const userCheck = async (user_id) => {
    try {
        const result = await user.findOne({ where: { user_id } })
        console.log(result)
    } catch (error) {
        console.error(error);
    }

};

const userJoin = async (data) => {

    try {
        const result = await user.create({
            user_id: data.user_id,
            user_name: data.user_name,
            user_password: data.user_password,
            user_nickname: data.user_nickname,
            auth_code: "A4",
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }

};

const userLogin = async (data) => {
    try {
        const result = await user.findOne({ where: { user_id: data.user_id }, raw: true })
        if (result) {
            if (result.user_password === data.user_password) {
                return { user: result, check: 1 };
            } else {
                return { check: 0 };
            }
        } else {
            return { check: -1 };
        }

    } catch (error) {
        console.error(error);
    }

};

const userList = async () => {
    try {
        const result = await user.findAll({
            attributes: ['user_code','user_name', 'user_nickname'], 
            include: [
                {
                    model: auth,
                    attributes: ['auth_name'], // work_pattern 테이블에서 필요한 컬럼 선택
                    required: true, 
                },
            ],

        })
        console.log(result)
        return result;


    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    userCheck,
    userJoin,
    userLogin,
    userList,

};