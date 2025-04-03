const db = require("../models/index"); // Sequelize 모델이 정의된 index.js 파일

const noticess = [
    { notice_title: "안녕하세요 직원관리 시스템입니다.", notice_content: "직원관리 시스템의 기본 공지사항 내용입니다. 제목과 내용을 수정해주세요." },
];

const noticeData = async () => {
    try {
        // 데이터베이스에 기존 데이터가 있는지 확인
        const count = await db.notice.count();
        if (count > 0) {
            console.log("초기 auth 데이터가 이미 삽입되어 있습니다.");
            return; // 데이터가 있으면 추가 작업을 하지 않음
        }

        // 초기 데이터 삽입
        await Promise.all(
            noticess.map((notices) => {
                return db.notice.create(notices);
            })
        );
        console.log("✅ 초기 notice 데이터 삽입 완료");
    } catch (error) {
        console.error("데이터베이스 notice 초기화 중 오류:", error);
    }
};

module.exports = noticeData;
