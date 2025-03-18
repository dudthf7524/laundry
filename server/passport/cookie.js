const passport = require("passport");
const login = require("./login");


const { user } = require("../models");
module.exports = async () => {
  try {
    await passport.serializeUser((user, done) => {
      console.log(user)
      process.nextTick(() => {
        done(null, { user_id:user.user_id });
      })
    });

    await passport.deserializeUser(async (data, done) => {
      console.log(data)
      try {
        const user_r = await user.findOne({
          where: { user_id: data.user_id },
          attributes: ["user_code", "user_name", "auth_code"],
          raw: true
        });

        if (!user_r) {
          console.log("user not found!");
          return done(null, false); // 사용자를 찾지 못했을 때, false 반환 (세션 종료)
        }
        console.log(user_r)
        done(null, user_r);
      } catch (error) {
        console.error(error);
        done(error);
      }
    });

    login();
    passport._debug = true;  // 디버깅 활성화

  } catch (error) {
    console.error(error)
  }

};



passport._debug = true;