const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const user = require('../databases/user');

module.exports = () => {

    passport.use(
        'user',
        new LocalStrategy(
            {
                usernameField: "user_id",
                passwordField: "user_password",
                passReqToCallback: true,
            },
            async (req, user_id, user_password, done) => {

                console.log("login_id :", user_id)
                console.log("password :", user_password)
                try {
                    const result = await user.userLogin(user_id, user_password);
                    if (result) {
                        return done(null, result);
                    }
                   
                } catch (error) {
                    console.error(error);
                    return done(error);
                }
            }
        )
    );
};
