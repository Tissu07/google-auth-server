const router = require('express').Router()
const passport = require('passport')
const authController = require('../controller/authController')


router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    authController.googleCallback
)

router.post('/refresh', authController.refreshToken);

router.get('/user',
    passport.authenticate('jwt', { session: false }),
    authController.getUser
)

router.post('/logout', async (req, res) => {
    // res.clearCookie('token', { httpOnly: true, sameSite: 'lax' })
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'lax' });
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax' });

    // also clear from DB if you’re storing refreshToken
    if (req.user) {
        req.user.refreshToken = null;
        await req.user.save();
    }
    res.status(201).json({ message: 'logout successfully' })
})