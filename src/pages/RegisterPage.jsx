import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/register.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        communityName: "",
        religion: "",
        phoneNumber: "",
        emailAddress: "",
        whatsappGroupLink: "",
        communityDescription: "",
        logo: null,
    });

    const [errors, setErrors] = useState({});
    const [fileName, setFileName] = useState("Choose File");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            logo: file,
        }));
        setFileName(file ? file.name : "Choose File");

        if (errors.logo) {
            setErrors((prev) => ({
                ...prev,
                logo: "",
            }));
        }
    };

    const validateForm = () => {
    const newErrors = {};

    if (!formData.communityName.trim()) {
        newErrors.communityName = "Community name is required";
    }

    if (!formData.religion.trim()) {
        newErrors.religion = "Religion is required";
    }

    if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.emailAddress.trim()) {
        newErrors.emailAddress = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
        newErrors.emailAddress = "Please enter a valid email address";
    }

    if (!formData.whatsappGroupLink.trim()) {
        newErrors.whatsappGroupLink = "WhatsApp group link is required";
    }

    if (!formData.communityDescription.trim()) {
        newErrors.communityDescription = "Community description is required";
    }

    if (!formData.logo) {
        newErrors.logo = "Logo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        console.log("Form submitted:", formData);
    }
};

return (
    <div className="register-page">
    
    <Navbar />

    <main className="register-main">
        <div className="register-container">
            <header className="register-header">
                <h1 className="register-title">Add Your Community</h1>
                <p className="register-subtitle">Fill Out The Following Form To Register Your Community Into Our Database</p>
                <p className="register-note">{" "}<span className="note"> * </span> = Required Field</p>
            </header>

            <form className="register-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="communityName" className="form-label">Community Name <span className="note"> * </span></label>
                    <input type="text" id="communityName" name="communityName" className={`form-input ${ errors.communityName ? "form-input--error" : "" }`} value={formData.communityName} onChange={handleInputChange} required/>
                    {errors.communityName && (
                        <span className="error-message" role="alert">
                            {errors.communityName}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="religion" className="form-label">Religion <span className="note"> * </span></label>
                    <input type="text" id="religion" name="religion" className={`form-input ${ errors.religion ? "form-input--error" : ""}`} value={formData.religion} onChange={handleInputChange} required/>
                    {errors.religion && (
                        <span className="error-message" role="alert">
                            {errors.religion}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number <span className="note"> * </span></label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" className={`form-input ${ errors.phoneNumber ? "form-input--error" : ""}`} value={formData.phoneNumber} onChange={handleInputChange} required/>
                    {errors.phoneNumber && (
                        <span className="error-message" role="alert">
                            {errors.phoneNumber}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="emailAddress" className="form-label">Email Address <span className="note"> * </span></label>
                    <input type="email" id="emailAddress" name="emailAddress" className={`form-input ${ errors.emailAddress ? "form-input--error" : ""}`} value={formData.emailAddress} onChange={handleInputChange} required/>
                    {errors.emailAddress && (
                        <span className="error-message" role="alert">
                            {errors.emailAddress}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="whatsappGroupLink" className="form-label">WhatsApp Group Link <span className="note"> * </span></label>
                    <input type="url" id="whatsappGroupLink" name="whatsappGroupLink" className={`form-input ${ errors.whatsappGroupLink ? "form-input--error" : ""}`} value={formData.whatsappGroupLink} onChange={handleInputChange} required/>
                    {errors.whatsappGroupLink && (
                        <span className="error-message" role="alert">
                            {errors.whatsappGroupLink}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="communityDescription" className="form-label">Community Description <span className="note"> * </span></label>
                    <textarea id="communityDescription" name="communityDescription" className={`form-textarea ${ errors.communityDescription ? "form-input--error" : "" }`} rows="4" value={formData.communityDescription} onChange={handleInputChange} required/>
                    {errors.communityDescription && (
                        <span className="error-message" role="alert">
                            {errors.communityDescription}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="logo" className="form-label">Logo <span className="note"> * </span></label>
                    <div className="file-input-wrapper">
                        <input type="file" id="logo" name="logo" className="file-input" accept="image/*" onChange={handleFileChange} required/>
                        <label htmlFor="logo" className="file-input-label">{fileName}</label>
                    </div>
                    {errors.logo && (
                        <span className="error-message" role="alert">
                            {errors.logo}
                        </span>
                    )}
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">Create</button>
                </div>
            </form>
        </div>
    </main>

    <Footer />
    </div>
    );
};

export default RegisterPage;
