const User = require('../Models/user');
const jwt = require('jsonwebtoken')

exports.googleCallback = async (req, res) => {
    try {
        //generate token
        const accessToken = jwt.sign(
            { sub: req.user._id, email: req.user.email, isAdmin: req.user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '15m' } // short-lived
        );

        const refreshToken = jwt.sign(
            { sub: req.user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' } // long-lived
        );

        req.user.refreshToken = refreshToken;
        await req.user.save();

        // set token in secure http-only cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 // 15 minute
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // redirect to user dashboard
        res.redirect(`${process.env.UI_URL}/success-login?access_token=${accessToken}`)
    } catch (error) {
        console.error('Error during google callback', error)
        res.status(500).json({ message: "Internal server error during login" })
    }
}



exports.refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        // Verify token matches stored one
        const user = await User.findById(payload.sub);
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate new access token
        const newAccessToken = jwt.sign(
            { sub: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000 // 15 minute
        });

        // ✅ send token in response too
        res.json({ success: true, accessToken: newAccessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(401).json({ message: "Invalid or expired refresh token" });
    }
};

exports.getUser = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" })
        }
        res.json({
            user: req.user
        })
    } catch (error) {
        console.error('Error fetching user details', error)
        res.status(500).json({ message: "Internal server error" })
    }
}