import React, { useState } from 'react';
import { requestOTP, verifyOTP } from '../../api';

const VerifyOTP = () => {
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleRequestOtp = async () => {
        try {
            await requestOTP(username);
            setMessage('OTP sent');
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await verifyOTP(username, otp);
            setMessage('OTP verified');
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    return (
        <div>
            <h2>Verify OTP</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={handleRequestOtp}>Request OTP</button>
            <hr />
            <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyOTP;
