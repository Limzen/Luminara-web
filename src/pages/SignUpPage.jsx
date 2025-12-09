import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuxeButton, LuxeInput } from '../components/luxe/LuxeComponents';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    User: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
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
    Phone: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.password) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!agreed) {
            setError('Please agree to the terms and conditions');
            return;
        }

        setLoading(true);
        // Simulated registration - replace with actual API call
        setTimeout(() => {
            setLoading(false);
            navigate('/signin');
        }, 1500);
    };

    return (
        <div className="luxe-auth">
            {/* Visual Side */}
            <div className="luxe-auth__visual">
                <img
                    src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80"
                    alt=""
                    className="luxe-auth__visual-img"
                />
                <div className="luxe-auth__visual-overlay"></div>
                <div className="luxe-auth__visual-content">
                    <h2 className="luxe-auth__visual-title">
                        Start Your<br />
                        <span className="luxe-gradient-text">Journey Today</span>
                    </h2>
                    <p className="luxe-auth__visual-desc">
                        Create an account to save itineraries, join communities,
                        and discover personalized recommendations.
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

                    <h1 className="luxe-auth__title">Create account</h1>
                    <p className="luxe-auth__subtitle">Join the Luminara community</p>

                    {/* Social Login */}
                    <div className="luxe-auth__social">
                        <button type="button" className="luxe-auth__social-btn">
                            <Icons.Google />
                            <span>Sign up with Google</span>
                        </button>
                    </div>

                    <div className="luxe-auth__divider">or register with email</div>

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
                        type="text"
                        name="fullName"
                        label="Full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        icon={<Icons.User />}
                    />

                    <LuxeInput
                        type="email"
                        name="email"
                        label="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Icons.Mail />}
                    />

                    <LuxeInput
                        type="tel"
                        name="phone"
                        label="Phone number (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={<Icons.Phone />}
                    />

                    <LuxeInput
                        type="password"
                        name="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        icon={<Icons.Lock />}
                    />

                    <LuxeInput
                        type="password"
                        name="confirmPassword"
                        label="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        icon={<Icons.Lock />}
                    />

                    {/* Terms Checkbox */}
                    <label style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-3)',
                        marginBottom: 'var(--space-6)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--gray-400)',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            style={{
                                marginTop: '3px',
                                accentColor: 'var(--gold-400)'
                            }}
                        />
                        <span>
                            I agree to the{' '}
                            <a href="#" style={{ color: 'var(--gold-400)' }}>Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" style={{ color: 'var(--gold-400)' }}>Privacy Policy</a>
                        </span>
                    </label>

                    <LuxeButton
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={loading}
                    >
                        Create Account
                    </LuxeButton>

                    <p className="luxe-auth__footer">
                        Already have an account?{' '}
                        <Link to="/signin">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
