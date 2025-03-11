const db = require("../models/index"); // Sequelize 모델이 정의된 index.js 파일

const processes = [
    { process_code: "P1", process_name: "다림질", hour_average: 120 },
    { process_code: "P2", process_name: "하의류 다림질", hour_average: 120 },
    { process_code: "P3", process_name: "상의류 다림질", hour_average: 120 },
    { process_code: "P4", process_name: "와이셔츠 다림질", hour_average: 120 },
    { process_code: "P5", process_name: "패딩 프레스", hour_average: 120 },
    { process_code: "P6", process_name: "신발 세탁", hour_average: 120 },
    { process_code: "P7", process_name: "전처리 세탁", hour_average: 120 },
    { process_code: "P8", process_name: "세탁물 검수", hour_average: 120 },
    { process_code: "P9", process_name: "1차 포장", hour_average: 120 },
    { process_code: "P10", process_name: "2차 포장", hour_average: 120 },
    { process_code: "P11", process_name: "수거배송", hour_average: 120 },
];

const processData = async () => {
    try {
        // 데이터베이스에 기존 데이터가 있는지 확인
        const count = await db.process.count();
        if (count > 0) {
            console.log("초기 process 데이터가 이미 삽입되어 있습니다.");
            return; // 데이터가 있으면 추가 작업을 하지 않음
        }

        // 초기 데이터 삽입
        await Promise.all(
            processes.map((processe) => {
                return db.process.create(processe);
            })
        );
        console.log("✅ 초기 process 데이터 삽입 완료");
    } catch (error) {
        console.error("데이터베이스 process 초기화 중 오류:", error);
    }
};

module.exports = processData;
