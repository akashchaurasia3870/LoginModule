import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: String,
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    otp: String,
    otpExpires: Date,
    isVerifiedUser: {
        type: Boolean,
        default: false,
    },
});

export default userSchema;
