const db = require("../models/index"); // Sequelize 모델이 정의된 index.js 파일

const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월(0부터 시작) 보정
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const userss = [
    {
        user_id: "kyungjunworld",
        user_password: "tpqkf053!!",
        user_name: "김경준",
        user_nickname: "boss",
        auth_code: "A1",
        user_hire_date: "2001-01-01",
        user_position: "대표",
        created_at: getFormattedDate(),
        updated_at: getFormattedDate()
    },
];

const userData = async () => {
    try {
        // 데이터베이스에 기존 데이터가 있는지 확인
        const count = await db.user.count();
        if (count > 0) {
            console.log("초기 user 데이터가 이미 삽입되어 있습니다.");
            return; // 데이터가 있으면 추가 작업을 하지 않음
        }

        // 초기 데이터 삽입
        await Promise.all(
            userss.map((users) => {
                return db.user.create(users);
            })
        );
        console.log("✅ 초기 user 데이터 삽입 완료");
    } catch (error) {
        console.error("데이터베이스 user 초기화 중 오류:", error);
    }
};

module.exports = userData;
