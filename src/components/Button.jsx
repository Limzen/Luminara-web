const Button = ({ text, onClick, style, icon }) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: '#8B5E3C',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                ...style,
            }}
        >
            {icon && <span>{icon}</span>}
            {text}
        </button>
    );
};

export default Button;