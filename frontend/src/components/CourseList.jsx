import React from 'react';
import { motion } from 'framer-motion';

const CourseCard = ({ course, onRegister }) => (
    <motion.div
        whileHover={{ y: -5 }}
        style={{ background: 'white', borderRadius: 'var(--border-radius)', padding: 'var(--spacing-lg)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
        <h3 style={{ marginTop: 0 }}>{course.title}</h3>
        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>
            {new Date(course.date).toLocaleDateString()} | ${course.price}
        </p>
        <p style={{ marginBottom: 'var(--spacing-md)' }}>{course.description}</p>
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Benefits:</strong>
            <p style={{ fontSize: '0.9rem' }}>{course.benefits}</p>
        </div>
        <button onClick={() => onRegister(course)} className="btn btn-primary" style={{ width: '100%' }}>Register Now</button>
    </motion.div>
);

const CourseList = ({ courses, onRegister }) => {
    return (
        <section id="courses" className="section" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>Upcoming Workshops</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} onRegister={onRegister} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseList;
