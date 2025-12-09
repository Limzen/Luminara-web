import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeInput, LuxeTextarea } from '../components/luxe/LuxeComponents';
import '../styles/luxe-pages.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        communityName: '',
        religion: '',
        phoneNumber: '',
        emailAddress: '',
        whatsappGroupLink: '',
        communityDescription: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.communityName.trim()) newErrors.communityName = 'Community name is required';
        if (!formData.religion.trim()) newErrors.religion = 'Religion is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.emailAddress.trim()) {
            newErrors.emailAddress = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
            newErrors.emailAddress = 'Please enter a valid email';
        }
        if (!formData.communityDescription.trim()) newErrors.communityDescription = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate('/community');
            }, 1500);
        }
    };

    return (
        <div className="luxe-page">
            <LuxeNavbar />

            <section className="luxe-section" style={{ paddingTop: '140px' }}>
                <div className="luxe-container" style={{ maxWidth: '700px' }}>
                    <div className="luxe-detail-card">
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-3xl)',
                            fontWeight: 700,
                            color: 'var(--white)',
                            marginBottom: 'var(--space-2)'
                        }}>
                            Register Your Community
                        </h1>
                        <p style={{ color: 'var(--gray-400)', marginBottom: 'var(--space-8)' }}>
                            Fill out the form below to add your religious community to our directory.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <LuxeInput
                                name="communityName"
                                label="Community Name *"
                                value={formData.communityName}
                                onChange={handleInputChange}
                                error={errors.communityName}
                            />
                            <LuxeInput
                                name="religion"
                                label="Religion *"
                                value={formData.religion}
                                onChange={handleInputChange}
                                error={errors.religion}
                            />
                            <LuxeInput
                                name="phoneNumber"
                                label="Phone Number *"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                error={errors.phoneNumber}
                            />
                            <LuxeInput
                                name="emailAddress"
                                label="Email Address *"
                                type="email"
                                value={formData.emailAddress}
                                onChange={handleInputChange}
                                error={errors.emailAddress}
                            />
                            <LuxeInput
                                name="whatsappGroupLink"
                                label="WhatsApp Group Link"
                                type="url"
                                value={formData.whatsappGroupLink}
                                onChange={handleInputChange}
                            />
                            <LuxeTextarea
                                name="communityDescription"
                                label="Community Description *"
                                value={formData.communityDescription}
                                onChange={handleInputChange}
                                rows={4}
                                error={errors.communityDescription}
                            />

                            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                                <Link to="/community">
                                    <LuxeButton type="button" variant="secondary">
                                        Cancel
                                    </LuxeButton>
                                </Link>
                                <LuxeButton type="submit" variant="primary" loading={loading} style={{ flex: 1 }}>
                                    Submit Registration
                                </LuxeButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <LuxeFooter />
        </div>
    );
};

export default RegisterPage;
