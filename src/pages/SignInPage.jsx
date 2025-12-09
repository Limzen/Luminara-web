import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    Google: () => (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    ),
};

const SignInPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        // Simulated login - replace with actual API call
        setTimeout(() => {
            setLoading(false);
            navigate('/');
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
                        Discover Sacred<br />
                        <span className="luxe-gradient-text">Destinations</span>
                    </h2>
                    <p className="luxe-auth__visual-desc">
                        Join thousands of travelers exploring Medan's
                        most remarkable religious landmarks.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="luxe-auth__form-container">
                <form className="luxe-auth__form" onSubmit={handleSubmit}>
                    <Link to="/" className="luxe-auth__logo">
                        <img src="/images/luminara_logo.png" alt="Luminara" />
                        <span>LUMINARA</span>
                    </Link>

                    <h1 className="luxe-auth__title">Welcome back</h1>
                    <p className="luxe-auth__subtitle">Sign in to continue your journey</p>

                    {/* Social Login */}
                    <div className="luxe-auth__social">
                        <button type="button" className="luxe-auth__social-btn">
                            <Icons.Google />
                            <span>Google</span>
                        </button>
                    </div>

                    <div className="luxe-auth__divider">or continue with email</div>

                    {/* Error Message */}
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

                    {/* Form Fields */}
                    <LuxeInput
                        type="email"
                        name="email"
                        label="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Icons.Mail />}
                    />

                    <LuxeInput
                        type="password"
                        name="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        icon={<Icons.Lock />}
                    />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: 'var(--space-6)'
                    }}>
                        <Link
                            to="/passwordmanager"
                            style={{
                                color: 'var(--gold-400)',
                                fontSize: 'var(--text-sm)',
                                textDecoration: 'none'
                            }}
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <LuxeButton
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={loading}
                    >
                        Sign In
                    </LuxeButton>

                    <p className="luxe-auth__footer">
                        Don't have an account?{' '}
                        <Link to="/signup">Create one</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
