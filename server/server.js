const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');
const { auth } = require("./models");
const { workType } = require("./models");
const cookieParser = require('cookie-parser');


const passportConfig = require("./passport/cookie");
const passport = require("passport");
const session = require("express-session");

const app = express();
const PORT = 8080;

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const workTypeRoutes = require('./routes/workType');

passportConfig();
app.use(express.json());

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
    });

  } catch (error) {
    console.error("❌ 서버 시작 중 오류 발생:", error);
  }
})();

// ✅ 기본 권한 데이터 추가 함수
async function addDefaultAuths() {
  try {
    const defaultAuths = [
      { auth_code: "A1", auth_name: "마스터" },
      { auth_code: "A2", auth_name: "서브 마스터" },
      { auth_code: "A3", auth_name: "매니저" },
      { auth_code: "A4", auth_name: "직원" },
    ];

    for (const authOne of defaultAuths) {
      await auth.findOrCreate({
        where: { auth_code: authOne.auth_code },
        defaults: authOne,
      });
    }

    const defaultWorkTypes = [
      { work_type_code: "WT1", work_type_name: "대표" },
      { work_type_code: "WT2", work_type_name: "소장" },
      { work_type_code: "WT3", work_type_name: "운영직원" },
      { work_type_code: "WT4", work_type_name: "다림직원" },
      { work_type_code: "WT5", work_type_name: "배송직원" },
      { work_type_code: "WT6", work_type_name: "알바" },

    ];

    for (const workTypes of defaultWorkTypes) {
      await workType.findOrCreate({
        where: { work_type_code: workTypes.work_type_code },
        defaults: workTypes,
      });
    }

    console.log("✅ 기본 권한 데이터 추가 완료");
  } catch (error) {
    console.error("❌ 기본 권한 데이터 추가 중 오류 발생:", error);
  }
}

app.use(
  session({
    secret: "암호화에 쓸 비번", // 세션 암호화 키
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 접근하지 못하도록
      secure: false, // HTTPS에서만 작동하도록 설정
      maxAge: 24 * 60 * 60 * 1000, // 쿠키 만료 시간 설정 (1일)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API 라우트 설정
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/workType', workTypeRoutes);







