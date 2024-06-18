import express from 'express';
import { register, login, googleAuth, googleAuthCallback, requestPasswordReset, resetPasswordToken, requestOTP, verifyOTPToken } from '../controllers/authController.js';
import { ensureAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPasswordToken);
router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTPToken);
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send('Welcome to your dashboard!');
});

export default router;
