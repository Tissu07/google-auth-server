const { Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../../model/User');

// const cookieExtractor = req => req.cookies?.token;
const cookieExtractor = req => req.cookies?.accessToken;

module.exports = (passport) => {
    passport.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET
    }, async (payload, done) => {
        try {
            const user = await User.findById(payload.sub)
            if (user) {
                done(null, user)
            }
            else {
                done(null, false)
            }
        } catch (error) {
            done(error, false)
        }
    }))
}