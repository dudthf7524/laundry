const { vacation } = require("../models");
const { user } = require("../models");

const vacationRegister = async (data, user_code) => {
    try {
        const result = await vacation.create({
            vacation_date: data.vacation_date,
            vacation_content: data.vacation_content,
            vacation_state: "신청",
            user_code: user_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }

};


const vacationList = async () => {
    try {
        const result = await vacation.findAll({
            attributes: ['vacation_id', 'vacation_date', 'vacation_content', 'vacation_state'],
            include: [
                {
                    model: user,
                    attributes: ['user_name'], // work_pattern 테이블에서 필요한 컬럼 선택
                    required: true,
                },
            ],

        })

        return result;


    } catch (error) {
        console.error(error);
    }
};

const vacationAllow = async (data) => {
    try {
        const result = await vacation.update(
            {
                vacation_state: "승인", // 변경할 값
            },
            {
                where: {
                    vacation_id: data.vacation_id, // 특정 work_time_id를 가진 행 업데이트
                },
            },

        )

        return result;

    } catch (error) {
        console.error(error);
    }
};

const vacationUser = async (user_code) => {
    try {
        const result = await vacation.findAll({ where: { user_code: user_code } })
        return result;
    } catch (error) {
        console.error(error);
    }
};

const vacationRegisterAdmin = async (data) => {
    try {
        const result = await vacation.create({
            vacation_date: data.vacation_date,
            vacation_content: data.vacation_content,
            vacation_state: "승인",
            user_code: data.user_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    vacationRegister,
    vacationList,
    vacationAllow,
    vacationUser,
    vacationRegisterAdmin,
};