import passport from 'passport';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { registerUser, authenticateUser, generatePasswordReset, resetPassword, generateOTP, verifyOTP } from '../services/authService.js';

import User from '../models/userModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = new User({ googleId: profile.id, username: profile.displayName, isVerifiedUser: true });
                await user.save();
            } else {
                user.isVerifiedUser = true;
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        await registerUser(username, password);
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        req.login(user, (err) => {
            if (err) return res.status(500).send(err.message);
            res.redirect('/dashboard');
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const googleAuth = passport.authenticate('google', { scope: ['profile'] });

export const googleAuthCallback = passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
});

export const requestPasswordReset = async (req, res) => {
    try {
        const { username } = req.body;
        await generatePasswordReset(username);
        res.status(200).send('Password reset email sent');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const resetPasswordToken = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        await resetPassword(token, newPassword);
        res.status(200).send('Password has been reset');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const requestOTP = async (req, res) => {
    try {
        const { username } = req.body;
        await generateOTP(username);
        res.status(200).send('OTP sent');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const verifyOTPToken = async (req, res) => {
    try {
        const { username, otp } = req.body;
        await verifyOTP(username, otp);
        res.status(200).send('OTP verified');
    } catch (err) {
        res.status(400).send(err.message);
    }
};
