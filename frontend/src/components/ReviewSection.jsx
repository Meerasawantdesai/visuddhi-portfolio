import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewSection = ({ reviews, onAddReview }) => {
    const [newReview, setNewReview] = useState({ author_name: '', content: '', rating: 5 });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddReview(newReview);
        setNewReview({ author_name: '', content: '', rating: 5 });
        alert("Review submitted! It will appear once approved by admin.");
    };

    return (
        <section className="section">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>What People Say</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    {reviews.map(review => (
                        <div key={review.id} style={{ background: '#fff', padding: 'var(--spacing-lg)', borderRadius: 'var(--border-radius)', border: '1px solid #efefef' }}>
                            <div style={{ display: 'flex', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: 'var(--spacing-md)' }}>"{review.content}"</p>
                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>- {review.author_name}</p>
                        </div>
                    ))}
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--color-secondary)', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius)' }}>
                    <h3 style={{ textAlign: 'center' }}>Leave a Review</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            placeholder="Your Name"
                            required
                            value={newReview.author_name}
                            onChange={e => setNewReview({ ...newReview, author_name: e.target.value })}
                        />
                        <textarea
                            className="input"
                            rows="4"
                            placeholder="Your Experience..."
                            required
                            value={newReview.content}
                            onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                        />
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <label>Rating: </label>
                            <select
                                value={newReview.rating}
                                onChange={e => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                                className="input"
                                style={{ width: 'auto', display: 'inline-block', marginLeft: '1rem' }}
                            >
                                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit for Approval</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
