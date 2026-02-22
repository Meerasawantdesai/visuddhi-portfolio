import React, { useState } from 'react';

const RegistrationForm = ({ course, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, course_id: course.id });
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius)', width: '100%', maxWidth: '500px' }}>
                <h2>Register for {course.title}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        className="input"
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        className="input"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit</button>
                        <button type="button" onClick={onCancel} className="btn" style={{ flex: 1, backgroundColor: '#eee' }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
