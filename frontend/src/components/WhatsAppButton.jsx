import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ phoneNumber }) => {
    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                backgroundColor: '#25D366',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 1000,
                border: 'none',
                cursor: 'pointer'
            }}
            title="Chat on WhatsApp"
        >
            <MessageCircle size={32} />
        </button>
    );
};

export default WhatsAppButton;
