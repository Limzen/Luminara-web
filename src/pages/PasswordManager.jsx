import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuxeButton, LuxeInput } from '../components/luxe/LuxeComponents';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    Mail: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
    Lock: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    ),
    ArrowLeft: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    ),
    Check: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
};

const PasswordManager = () => {
    const [step, setStep] = useState('request'); // request, verify, reset, success
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRequestReset = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email');
            return;
        }
        setLoading(true);
        setError('');
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('verify');
        }, 1500);
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (!code) {
            setError('Please enter the verification code');
            return;
        }
        setLoading(true);
        setError('');
        setTimeout(() => {
            setLoading(false);
            setStep('reset');
        }, 1500);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!passwords.new || !passwords.confirm) {
            setError('Please fill in both password fields');
            return;
        }
        if (passwords.new !== passwords.confirm) {
            setError('Passwords do not match');
            return;
        }
        if (passwords.new.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setLoading(true);
        setError('');
        setTimeout(() => {
            setLoading(false);
            setStep('success');
        }, 1500);
    };

    return (
        <div className="luxe-auth">
            {/* Visual Side */}
            <div className="luxe-auth__visual">
                <img
                    src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80"
                    alt=""
                    className="luxe-auth__visual-img"
                />
                <div className="luxe-auth__visual-overlay"></div>
                <div className="luxe-auth__visual-content">
                    <h2 className="luxe-auth__visual-title">
                        Secure Your<br />
                        <span className="luxe-gradient-text">Account</span>
                    </h2>
                    <p className="luxe-auth__visual-desc">
                        Reset your password to continue exploring Medan's sacred destinations.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="luxe-auth__form-container">
                <div className="luxe-auth__form">
                    <Link to="/" className="luxe-auth__logo">
                        <img src="/images/luminara_logo.png" alt="Luminara" />
                        <span>LUMINARA</span>
                    </Link>

                    {/* Step: Request Reset */}
                    {step === 'request' && (
                        <>
                            <h1 className="luxe-auth__title">Forgot Password?</h1>
                            <p className="luxe-auth__subtitle">
                                Enter your email and we'll send you a verification code
                            </p>

                            {error && (
                                <div style={{
                                    padding: 'var(--space-3) var(--space-4)',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    borderRadius: 'var(--radius-lg)',
                                    color: '#ef4444',
                                    fontSize: 'var(--text-sm)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRequestReset}>
                                <LuxeInput
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    icon={<Icons.Mail />}
                                />
                                <LuxeButton
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                    loading={loading}
                                >
                                    Send Verification Code
                                </LuxeButton>
                            </form>

                            <p className="luxe-auth__footer">
                                Remember your password?{' '}
                                <Link to="/signin">Sign in</Link>
                            </p>
                        </>
                    )}

                    {/* Step: Verify Code */}
                    {step === 'verify' && (
                        <>
                            <h1 className="luxe-auth__title">Verify Code</h1>
                            <p className="luxe-auth__subtitle">
                                Enter the 6-digit code sent to {email}
                            </p>

                            {error && (
                                <div style={{
                                    padding: 'var(--space-3) var(--space-4)',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    borderRadius: 'var(--radius-lg)',
                                    color: '#ef4444',
                                    fontSize: 'var(--text-sm)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleVerifyCode}>
                                <LuxeInput
                                    type="text"
                                    label="Verification Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter 6-digit code"
                                />
                                <LuxeButton
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                    loading={loading}
                                >
                                    Verify Code
                                </LuxeButton>
                            </form>

                            <button
                                onClick={() => setStep('request')}
                                style={{
                                    marginTop: 'var(--space-4)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--gold-400)',
                                    cursor: 'pointer',
                                    width: '100%',
                                    textAlign: 'center'
                                }}
                            >
                                ← Back to email entry
                            </button>
                        </>
                    )}

                    {/* Step: Reset Password */}
                    {step === 'reset' && (
                        <>
                            <h1 className="luxe-auth__title">Reset Password</h1>
                            <p className="luxe-auth__subtitle">
                                Create a new password for your account
                            </p>

                            {error && (
                                <div style={{
                                    padding: 'var(--space-3) var(--space-4)',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    borderRadius: 'var(--radius-lg)',
                                    color: '#ef4444',
                                    fontSize: 'var(--text-sm)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleResetPassword}>
                                <LuxeInput
                                    type="password"
                                    label="New Password"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    icon={<Icons.Lock />}
                                />
                                <LuxeInput
                                    type="password"
                                    label="Confirm Password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    icon={<Icons.Lock />}
                                />
                                <LuxeButton
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                    loading={loading}
                                >
                                    Reset Password
                                </LuxeButton>
                            </form>
                        </>
                    )}

                    {/* Step: Success */}
                    {step === 'success' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto var(--space-6)',
                                background: 'rgba(34, 197, 94, 0.2)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ color: '#22c55e', width: '40px', height: '40px' }}>
                                    <Icons.Check />
                                </span>
                            </div>
                            <h1 className="luxe-auth__title">Password Reset!</h1>
                            <p className="luxe-auth__subtitle">
                                Your password has been successfully reset. You can now sign in with your new password.
                            </p>
                            <Link to="/signin">
                                <LuxeButton variant="primary" fullWidth style={{ marginTop: 'var(--space-6)' }}>
                                    Sign In
                                </LuxeButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PasswordManager;
