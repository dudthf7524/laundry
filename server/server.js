const express = require('express');
const { specs, swaggerUi } = require('./swagger');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');
const TbAuths = require("./models").TB_AUTHS;
const cookieParser = require('cookie-parser');
const userRoute = require('./src/routes/userRoute');
const noticeRoute = require('./src/routes/noticeRoute');
const scheduleRoute = require('./src/routes/scheduleRoute');
const processRoute = require('./src/routes/processRoute');
const workRoutes = require('./src/routes/workRoute');

const app = express();
const PORT = 8080; // ✅ 포트 변수 위치 변경

// Swagger API 문서 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API 라우트 설정
app.use('/api/user', userRoute);
app.use('/api/notice', noticeRoute);
app.use('/api/schedule', scheduleRoute);
app.use('/api/process', processRoute);
app.use('/works', workRoutes);

(async () => {
  try {
    // ✅ 데이터베이스 동기화
    //await sequelize.sync({ alter: true });
    await sequelize.sync({ force: false });
    console.log("✅ 테이블 동기화 완료 (새 컬럼 자동 추가)");

    // ✅ 기본 권한 데이터 추가
    await addDefaultAuths();

    // ✅ 🚀 서버 실행 (한 번만 실행)
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📜 API docs available at http://localhost:${PORT}/api-docs`);
    });

  } catch (error) {
    console.error("❌ 서버 시작 중 오류 발생:", error);
  }
})();

// ✅ 기본 권한 데이터 추가 함수
async function addDefaultAuths() {
  try {
    const defaultAuths = [
      { auth_code: "USER", auth_name: "기본 권한" },
      { auth_code: "ADMIN", auth_name: "관리자 권한" },
    ];

    for (const auth of defaultAuths) {
      await TbAuths.findOrCreate({
        where: { auth_code: auth.auth_code },
        defaults: auth,
      });
    }

    console.log("✅ 기본 권한 데이터 추가 완료");
  } catch (error) {
    console.error("❌ 기본 권한 데이터 추가 중 오류 발생:", error);
  }
}
