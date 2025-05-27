import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/signinpage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();

        setError('');

        // Validasi input
        if (!email && !password) {
            setError('All fields must be filled.');
            return;
        }

        if (!email) {
            setError('All fields must be filled.');
            return;
        }

        if (!password) {
            setError('All fields must be filled.');
            return;
        }

        // Jika hanya password yang diisi
        if (password && !email) {
            setError('Email harus diisi jika Password sudah diisi.');
            return;
        }

        // Validasi format email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Email tidak valid. Pastikan menggunakan format yang benar.');
            return;
        }

        console.log('Sign in berhasil dengan email:', email);

        navigate('/'); 
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signin-container">
            <div className="signin-form">
                <h1>Welcome Back 👋</h1>
                <p>Today is a new day. It's your day. You shape it. Sign in to start managing your projects.</p>

                {error && <div className="error-message-box">{error}</div>}

                <form onSubmit={handleSignIn}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} /> 
                            </button>
                        </div>
                        <a href="/passwordmanager" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="signin-button">Sign in</button>
                </form>

                <p className="footer-text">Don't you have an account? <a href="/signup">Sign up</a></p>
            </div>

            <div className="signin-image">
                <img src="/images/logo_auth.png" alt="Luminara logo" />
            </div>
        </div>
    );
};

export default SignInPage;
