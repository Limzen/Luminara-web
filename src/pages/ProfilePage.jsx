import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/profilepage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        phoneNumber: "",
        emailAddress: "",
        dateOfBirth: "",
        password: "",
        accountType: "User"
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile updated:", profileData);
    };

    return (
        <div className="profile-page">
            <Navbar />
            <main className="profile-main">
                <div className="profile-container">
                    <header className="profile-header">
                        <h1 className="profile-title">Profile Information</h1>
                    </header>

                    <form className="profile-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name" name="name" className="form-input" value={profileData.name} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" className="form-input" value={profileData.phoneNumber} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                            <input type="email" id="emailAddress" name="emailAddress" className="form-input" value={profileData.emailAddress} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" className="form-input" value={profileData.dateOfBirth} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    name="password" 
                                    className="form-input" 
                                    value={profileData.password} 
                                    onChange={handleInputChange} 
                                />
                                <span 
                                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="accountType" className="form-label">Account Type</label>
                            <select 
                                id="accountType" 
                                name="accountType" 
                                className="form-input" 
                                value={profileData.accountType} 
                                onChange={handleInputChange}
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="submit-button">Save Changes</button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;