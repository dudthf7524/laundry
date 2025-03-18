const db = require("../models/index"); // Sequelize 모델이 정의된 index.js 파일

const authss = [
    { auth_code: "A1", auth_name: "마스터" },
    { auth_code: "A2", auth_name: "서브 마스터" },
    { auth_code: "A3", auth_name: "매니저" },
    { auth_code: "A4", auth_name: "직원" },
];

const authData = async () => {
    try {
        // 데이터베이스에 기존 데이터가 있는지 확인
        const count = await db.auth.count();
        if (count > 0) {
            console.log("초기 auth 데이터가 이미 삽입되어 있습니다.");
            return; // 데이터가 있으면 추가 작업을 하지 않음
        }

        // 초기 데이터 삽입
        await Promise.all(
            authss.map((auths) => {
                return db.auth.create(auths);
            })
        );
        console.log("✅ 초기 auth 데이터 삽입 완료");
    } catch (error) {
        console.error("데이터베이스 auth 초기화 중 오류:", error);
    }
};

module.exports = authData;
