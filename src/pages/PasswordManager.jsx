import React, { useState } from 'react';
import "../styles/passwordmanager.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordManager = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = (e) => {
        e.preventDefault();
        setError('');

        // Check if all fields are filled
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields must be filled.');
            return;
        }

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError('New Password and Confirm Password do not match.');
            return;
        }

        // If all checks pass, proceed with password change logic
        console.log('Password changed successfully');
    };

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="password-manager-container">
            <div className="password-manager-form">
                <h1>Password Manager</h1>

                {error && <div className="error-message-box">{error}</div>}

                <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label htmlFor="current-password">Current Password</label>
                        <div className="password-input-container">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                id="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                            />
                            <button type="button" className="toggle-password" onClick={toggleCurrentPasswordVisibility}>
                                <FontAwesomeIcon icon={showCurrentPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                        <a href="/forgotpassword" className="forgot-password">Forgot Password?</a>
                    </div>

                    <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <div className="password-input-container">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                            <button type="button" className="toggle-password" onClick={toggleNewPasswordVisibility}>
                                <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm New Password</label>
                        <div className="password-input-container">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                            />
                            <button type="button" className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
                                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="change-password-button">Change Password</button>
                </form>
            </div>

            <div className="password-manager-image">
                <img src="/images/logo_auth.png" alt="Luminara logo" />
            </div>
        </div>
    );
};

export default PasswordManager;