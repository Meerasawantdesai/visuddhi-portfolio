import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = ({ token, onLogout }) => {
    const [courses, setCourses] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', benefits: '', date: '', price: '' });

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
        headers: { Authorization: `Bearer ${token}` }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resCourses = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/courses`);
            const resReviews = await api.get('/admin/reviews');
            setCourses(resCourses.data);
            setReviews(resReviews.data);
        } catch (err) {
            console.error("Error fetching admin data", err);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            await api.post('/courses', newCourse);
            setNewCourse({ title: '', description: '', benefits: '', date: '', price: '' });
            fetchData();
        } catch (err) {
            alert("Error adding course");
        }
    };

    const handleReviewStatus = async (reviewId, isApproved) => {
        try {
            await api.patch(`/reviews/${reviewId}`, { is_approved: isApproved });
            fetchData();
        } catch (err) {
            alert("Error updating review");
        }
    };

    return (
        <div className="section">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <h1>Admin Dashboard</h1>
                    <button onClick={onLogout} className="btn" style={{ background: '#ff4444', color: 'white' }}>Logout</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                    <div>
                        <h3>Add New Workshop</h3>
                        <form onSubmit={handleAddCourse} style={{ background: '#fff', padding: 'var(--spacing-lg)', borderRadius: 'var(--border-radius)' }}>
                            <input className="input" placeholder="Title" required value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} />
                            <textarea className="input" placeholder="Description" required value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} />
                            <textarea className="input" placeholder="Benefits (comma separated)" required value={newCourse.benefits} onChange={e => setNewCourse({ ...newCourse, benefits: e.target.value })} />
                            <input className="input" type="datetime-local" required value={newCourse.date} onChange={e => setNewCourse({ ...newCourse, date: e.target.value })} />
                            <input className="input" type="number" placeholder="Price" required value={newCourse.price} onChange={e => setNewCourse({ ...newCourse, price: e.target.value })} />
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Workshop</button>
                        </form>
                    </div>

                    <div>
                        <h3>Pending Reviews</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {reviews.filter(r => !r.is_approved).map(review => (
                                <div key={review.id} style={{ background: '#fff', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }}>
                                    <p><strong>{review.author_name}:</strong> {review.content}</p>
                                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: 'var(--spacing-sm)' }}>
                                        <button onClick={() => handleReviewStatus(review.id, true)} className="btn" style={{ background: '#5d6d31', color: 'white', padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Approve</button>
                                        <button className="btn" style={{ background: '#eee', padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
