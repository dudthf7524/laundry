
const { user } = require("../models");
const { auth } = require("../models");



const userJoin = async (data) => {

    try {
        const result = await user.create({
            user_id: data.user_id,
            user_name: data.user_name,
            user_password: data.user_password,
            user_nickname: data.user_nickname,
            user_hire_date: data.user_hire_date,
            user_position: data.user_position,
            auth_code: "A4",
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }

};

const userLogin = async (user_id, user_password) => {

    try {
        const result = await user.findOne({ where: { user_id: user_id }, raw: true })
        if (result) {
            if (result.user_password === user_password) {
                return result;
            } else {
                return 0;
            }
        } else {
            return -1
        }
    } catch (error) {
        console.error(error);
    }

};

const userList = async () => {
    try {
        const result = await user.findAll({
            attributes: ['user_code', 'user_name', 'user_nickname', 'user_hire_date', 'user_position'],
            include: [
                {
                    model: auth,
                    attributes: ['auth_code', 'auth_name'], // work_pattern 테이블에서 필요한 컬럼 선택
                    required: true,
                },
            ],

        })

        return result;


    } catch (error) {
        console.error(error);
    }
};

const userUpdate = async (data) => {
    try {
        const result = await user.update(
            {
                user_name: data.user_name,
                user_nickname: data.user_nickname,
                user_position: data.user_position,
                user_hire_date: data.user_hire_date,
            },

            {
                where: {
                    user_code: data.user_code,
                },
            },

        )
        return result;

    } catch (error) {
        console.error(error);
    }
};

const userUpdateAuth = async (data) => {

    try {
        const result = await user.update(
            {
                auth_code: data.auth_code, // 변경할 값
            },
            {
                where: {
                    user_code: data.user_code, // 특정 work_time_id를 가진 행 업데이트
                },
            },

        )

        return result;

    } catch (error) {
        console.error(error);
    }
};

const userCheckId = async (data) => {
    try {
        const result = await user.findOne({ where: { user_id: data.user_id } })
        if (result) {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.error(error);
    }

};

const userCheckPassword = async (data, user_code) => {
    try {
        const result = await user.findOne({ 
            where: { user_code: user_code },
            attributes: ['user_password',],
            raw: true,
        })

        if (result.user_password === data.user_password) {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.error(error);
    }

};

const userChangeId = async (data, user_code) => {
    try {
        const result = await user.update(
            {
                user_id: data.user_id, // 변경할 값
            },
            {
                where: {
                    user_code: user_code, // 특정 work_time_id를 가진 행 업데이트
                },
            },
        )
        if (result) {
            return 1;
        } else {
            return 0;
        }

    } catch (error) {
        console.error(error);
    }
};

const userChangePassword = async (data, user_code) => {
    try {
        const result = await user.update(
            {
                user_password: data.new_user_password, // 변경할 값
            },
            {
                where: {
                    user_code: user_code, // 특정 work_time_id를 가진 행 업데이트
                },
            },
        )
        if (result) {
            return 1;
        } else {
            return 0;
        }

    } catch (error) {
        console.error(error);
    }
};

const userInformation = async (user_code) => {
    try {
        const result = await user.findOne({
            where: { user_code: user_code },
            attributes: ['user_name', 'user_nickname', 'user_position', 'user_hire_date'], // 원하는 컬럼만 지정
            raw: true,
        });
        return result
    } catch (error) {
        console.error(error);
    }

};



module.exports = {
    userJoin,
    userLogin,
    userList,
    userUpdate,
    userUpdateAuth,
    userCheckId,
    userCheckPassword,
    userChangeId,
    userChangePassword,
    userInformation,
};