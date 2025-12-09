import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LuxeComponents.css';

/* ============================================
   LUXE NAVBAR
   Responsive navigation with glass morphism
   ============================================ */
export const LuxeNavbar = ({ transparent = false }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/directory', label: 'Directory' },
        { path: '/itinerary', label: 'Itinerary' },
        { path: '/guide', label: 'Guide' },
        { path: '/community', label: 'Community' },
        { path: '/chatbot', label: 'AI Assistant' },
    ];

    return (
        <>
            <nav className={`luxe-nav ${scrolled ? 'scrolled' : ''} ${transparent ? 'transparent' : ''}`}>
                <div className="luxe-container luxe-nav__inner">
                    <Link to="/" className="luxe-nav__logo">
                        <img src="/images/luminara_logo.png" alt="Luminara" />
                        <span>LUMINARA</span>
                    </Link>

                    <ul className="luxe-nav__links">
                        {navLinks.map(link => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={location.pathname === link.path ? 'active' : ''}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="luxe-nav__actions">
                        <Link to="/signin" className="luxe-btn luxe-btn--secondary luxe-btn--sm">
                            Sign In
                        </Link>
                    </div>

                    <button
                        className={`luxe-nav__toggle ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`luxe-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="luxe-mobile-menu__content">
                    <ul className="luxe-mobile-menu__links">
                        {navLinks.map(link => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={location.pathname === link.path ? 'active' : ''}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="luxe-mobile-menu__actions">
                        <Link to="/signin" className="luxe-btn luxe-btn--primary luxe-btn--full">
                            Sign In
                        </Link>
                        <Link to="/signup" className="luxe-btn luxe-btn--secondary luxe-btn--full">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

/* ============================================
   LUXE BUTTON
   Versatile button with multiple variants
   ============================================ */
export const LuxeButton = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'right',
    as: Component = 'button',
    to,
    href,
    onClick,
    className = '',
    ...props
}) => {
    const classes = [
        'luxe-btn',
        `luxe-btn--${variant}`,
        `luxe-btn--${size}`,
        fullWidth && 'luxe-btn--full',
        loading && 'luxe-btn--loading',
        className
    ].filter(Boolean).join(' ');

    const content = (
        <>
            {loading && <span className="luxe-btn__spinner"></span>}
            {icon && iconPosition === 'left' && <span className="luxe-btn__icon">{icon}</span>}
            <span className="luxe-btn__text">{children}</span>
            {icon && iconPosition === 'right' && <span className="luxe-btn__icon">{icon}</span>}
        </>
    );

    if (to) {
        return <Link to={to} className={classes} {...props}>{content}</Link>;
    }

    if (href) {
        return <a href={href} className={classes} {...props}>{content}</a>;
    }

    return (
        <button className={classes} disabled={disabled || loading} onClick={onClick} {...props}>
            {content}
        </button>
    );
};

/* ============================================
   LUXE CARD
   Unified card component with variants
   ============================================ */
export const LuxeCard = ({
    children,
    variant = 'default',
    hover = true,
    padding = true,
    className = '',
    onClick,
    ...props
}) => {
    const classes = [
        'luxe-card',
        `luxe-card--${variant}`,
        hover && 'luxe-card--hover',
        padding && 'luxe-card--padded',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick} {...props}>
            {children}
        </div>
    );
};

export const LuxeCardImage = ({ src, alt, badge, aspectRatio = '16/10' }) => (
    <div className="luxe-card__image-wrapper" style={{ aspectRatio }}>
        <img src={src} alt={alt} className="luxe-card__image" loading="lazy" />
        {badge && <span className="luxe-card__badge">{badge}</span>}
    </div>
);

export const LuxeCardContent = ({ children, className = '' }) => (
    <div className={`luxe-card__content ${className}`}>{children}</div>
);

export const LuxeCardFooter = ({ children }) => (
    <div className="luxe-card__footer">{children}</div>
);

/* ============================================
   LUXE INPUT
   Form input with floating label
   ============================================ */
export const LuxeInput = ({
    label,
    type = 'text',
    error,
    success,
    icon,
    className = '',
    ...props
}) => {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value && props.value.length > 0;

    return (
        <div className={`luxe-input ${error ? 'error' : ''} ${success ? 'success' : ''} ${className}`}>
            <div className="luxe-input__wrapper">
                {icon && <span className="luxe-input__icon">{icon}</span>}
                <input
                    type={type}
                    className={`luxe-input__field ${focused || hasValue ? 'has-value' : ''}`}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
                {label && <label className="luxe-input__label">{label}</label>}
            </div>
            {error && <span className="luxe-input__error">{error}</span>}
        </div>
    );
};

export const LuxeTextarea = ({
    label,
    error,
    rows = 4,
    className = '',
    ...props
}) => {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value && props.value.length > 0;

    return (
        <div className={`luxe-input luxe-textarea ${error ? 'error' : ''} ${className}`}>
            <div className="luxe-input__wrapper">
                <textarea
                    rows={rows}
                    className={`luxe-input__field ${focused || hasValue ? 'has-value' : ''}`}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
                {label && <label className="luxe-input__label">{label}</label>}
            </div>
            {error && <span className="luxe-input__error">{error}</span>}
        </div>
    );
};

/* ============================================
   LUXE SKELETON
   Loading placeholder components
   ============================================ */
export const LuxeSkeleton = ({
    variant = 'text',
    width,
    height,
    className = ''
}) => (
    <div
        className={`luxe-skeleton luxe-skeleton--${variant} ${className}`}
        style={{ width, height }}
    />
);

export const LuxeCardSkeleton = () => (
    <div className="luxe-card luxe-card--padded">
        <LuxeSkeleton variant="image" height="180px" />
        <div className="luxe-card__content">
            <LuxeSkeleton variant="text" width="60%" height="24px" />
            <LuxeSkeleton variant="text" width="80%" height="16px" />
            <LuxeSkeleton variant="text" width="40%" height="16px" />
        </div>
    </div>
);

/* ============================================
   LUXE MODAL
   Overlay dialog component
   ============================================ */
export const LuxeModal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md'
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="luxe-modal-overlay" onClick={onClose}>
            <div
                className={`luxe-modal luxe-modal--${size}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="luxe-modal__header">
                    <h3 className="luxe-modal__title">{title}</h3>
                    <button className="luxe-modal__close" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="luxe-modal__body">
                    {children}
                </div>
            </div>
        </div>
    );
};

/* ============================================
   LUXE FOOTER
   Site-wide footer component
   ============================================ */
export const LuxeFooter = () => (
    <footer className="luxe-footer">
        <div className="luxe-container">
            <div className="luxe-footer__grid">
                <div className="luxe-footer__brand">
                    <Link to="/" className="luxe-footer__logo">
                        <img src="/images/luminara_logo.png" alt="Luminara" />
                        <span>LUMINARA</span>
                    </Link>
                    <p>
                        Discover the beauty of spiritual tourism in Medan through
                        innovative digital solutions crafted with passion.
                    </p>
                    <div className="luxe-footer__social">
                        <a href="#" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                        </a>
                        <a href="mailto:hello@luminara.id" aria-label="Email">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="luxe-footer__col">
                    <h4>Explore</h4>
                    <ul>
                        <li><Link to="/directory">Directory</Link></li>
                        <li><Link to="/itinerary">Itinerary</Link></li>
                        <li><Link to="/guide">Guides</Link></li>
                        <li><Link to="/chatbot">AI Assistant</Link></li>
                    </ul>
                </div>

                <div className="luxe-footer__col">
                    <h4>Community</h4>
                    <ul>
                        <li><Link to="/community">Join Groups</Link></li>
                        <li><Link to="/article">Articles</Link></li>
                        <li><Link to="/profile">My Account</Link></li>
                    </ul>
                </div>

                <div className="luxe-footer__col">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="tel:+621234567890">+62 123 456 7890</a></li>
                        <li><a href="mailto:hello@luminara.id">hello@luminara.id</a></li>
                        <li><span>Medan, Indonesia</span></li>
                    </ul>
                </div>
            </div>

            <div className="luxe-footer__bottom">
                <p>&copy; {new Date().getFullYear()} Luminara. All rights reserved.</p>
                <div className="luxe-footer__links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </div>
        </div>
    </footer>
);

/* ============================================
   LUXE SECTION HEADER
   Reusable section titles
   ============================================ */
export const LuxeSectionHeader = ({
    label,
    title,
    description,
    centered = false,
    action
}) => (
    <div className={`luxe-section-header ${centered ? 'centered' : ''}`}>
        <div className="luxe-section-header__text">
            {label && <span className="luxe-section-label">{label}</span>}
            <h2 className="luxe-section-title">{title}</h2>
            {description && <p className="luxe-section-desc">{description}</p>}
        </div>
        {action && <div className="luxe-section-header__action">{action}</div>}
    </div>
);

/* ============================================
   LUXE RATING
   Star rating display
   ============================================ */
export const LuxeRating = ({ value = 0, showValue = true }) => (
    <div className="luxe-rating">
        <svg viewBox="0 0 24 24" fill="currentColor" className="luxe-rating__star">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {showValue && <span className="luxe-rating__value">{value.toFixed(1)}</span>}
    </div>
);

/* ============================================
   LUXE BADGE
   Small label/tag component
   ============================================ */
export const LuxeBadge = ({ children, variant = 'default' }) => (
    <span className={`luxe-badge luxe-badge--${variant}`}>{children}</span>
);

/* ============================================
   EXPORTS INDEX
   ============================================ */
export default {
    LuxeNavbar,
    LuxeFooter,
    LuxeButton,
    LuxeCard,
    LuxeCardImage,
    LuxeCardContent,
    LuxeCardFooter,
    LuxeInput,
    LuxeTextarea,
    LuxeSkeleton,
    LuxeCardSkeleton,
    LuxeModal,
    LuxeSectionHeader,
    LuxeRating,
    LuxeBadge,
};
