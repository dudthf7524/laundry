const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');


const passportConfig = require("./passport/cookie");
const passport = require("passport");
const session = require("express-session");

const app = express();
const port = 3060;

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const timeRoutes = require('./routes/time');

const processRoutes = require('./routes/process');
const userProcessRoutes = require('./routes/userProcess');
const taskRoutes = require('./routes/task');
const attendanceStartRoutes = require('./routes/attendanceStart');
const attendanceEndRoutes = require('./routes/attendanceEnd');
const vacationRoutes = require('./routes/vacation');
const companyAddressRoutes = require('./routes/companyAddress');
const taskStartRoutes = require('./routes/taskStart');
const taskEndRoutes = require('./routes/taskEnd');
const chartRoutes = require('./routes/chart');
const noticeRoutes = require('./routes/notice');
const CompanyVacationRoutes = require('./routes/companyVacation');
const logoutRoutes = require('./routes/logout');
const chartLateRoutes = require('./routes/chartLate');
const todayRoutes = require('./routes/today');



const authData = require("./modelsInitializeData/authData");
const processData = require("./modelsInitializeData/processData");
const noticeData = require("./modelsInitializeData/noticeData");
const userData = require('./modelsInitializeData/userData');

passportConfig();
app.use(express.json());

// CORS 설정
app.use(cors({
  origin: ['http://localhost:3000', 'https://www.washstation.shop/'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("✅ 데이터베이스 연결 성공");

    // 데이터를 순차적으로 삽입하여 충돌 방지
    try {
      await authData();
      console.log("✅ authData 삽입 완료");

      await processData();
      console.log("✅ processData 삽입 완료");

      await noticeData();
      console.log("✅ noticeData 삽입 완료");

      await userData();
      console.log("✅ userData 삽입 완료");
    } catch (error) {
      console.error("❌ 초기 데이터 삽입 실패:", error);
    }

    // 서버 실행
    app.listen(port, () => {
      console.log(`🚀 http://localhost:${port} 에서 서버 실행중`);
    });
  })
  .catch((err) => {
    console.error("데이터베이스 연결 실패:", err);
  });

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

// 정적 파일을 제공하는 미들웨어 설정
app.use(express.static(path.join(__dirname, "../client/build")));

// 루트 요청 시 index.html 반환
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// API 라우트 설정
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/time', timeRoutes);
app.use('/process', processRoutes);
app.use('/userProcess', userProcessRoutes);
app.use('/task', taskRoutes);
app.use('/attendanceStart', attendanceStartRoutes);
app.use('/attendanceEnd', attendanceEndRoutes);
app.use('/vacation', vacationRoutes);
app.use('/companyAddress', companyAddressRoutes);
app.use('/taskStart', taskStartRoutes);
app.use('/taskEnd', taskEndRoutes);
app.use('/chart', chartRoutes);
app.use('/notice', noticeRoutes);
app.use('/company/vacation', CompanyVacationRoutes);
app.use('/logout', logoutRoutes);
app.use('/chartLate', chartLateRoutes);
app.use('/today', todayRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});




