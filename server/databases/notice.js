const { notice } = require("../models");


const noticeList = async () => {
    try {
        const result = await notice.findOne()
        return result;
    } catch (error) {
        console.error(error);
    }

};

const noticeUpdate = async (data) => {

    try {
        const result = await notice.update(
            {
                notice_title: data.notice_title,
                notice_content: data.notice_content,
            },
            
            {
                where: {
                    notice_id: data.notice_id,
                },
            },
        )
        return result;

    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    noticeList,
    noticeUpdate,

};