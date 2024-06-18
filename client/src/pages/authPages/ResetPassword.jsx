import React, { useState } from 'react';
import { requestPasswordReset, resetPassword } from '../../api';

const ResetPassword = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRequestReset = async () => {
        try {
            await requestPasswordReset(username);
            setMessage('Password reset email sent');
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    const handleResetPassword = async () => {
        try {
            await resetPassword(token, newPassword);
            setMessage('Password has been reset');
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={handleRequestReset}>Request Password Reset</button>
            <hr />
            <input type="text" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={handleResetPassword}>Reset Password</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
