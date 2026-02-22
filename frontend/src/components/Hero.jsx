import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ name, bio, photoUrl }) => {
    return (
        <section className="section hero">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{ fontSize: '3rem', margin: 0 }}>{name || 'Dr. Yogesh Warke'}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-accent)', marginBottom: 'var(--spacing-lg)' }}>M.D. Ayurveda & Meditation Specialist</p>
                    <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-lg)' }}>
                        {bio || 'Founder of Visuddhi Foundation. Dedicated to the synthesis of ancient Ayurvedic wisdom and modern mindfulness.'}
                    </p>
                    <a href="#courses" className="btn btn-primary">Our Programs</a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ width: '100%', aspectRatio: '1/1', background: '#e0e0e0', borderRadius: '50%', overflow: 'hidden' }}
                >
                    {photoUrl || "/doctor.jpg" ? (
                        <img src={photoUrl || "/doctor.jpg"} alt={name || "Dr. Yogesh Warke"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                            Doctor's Photo
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
