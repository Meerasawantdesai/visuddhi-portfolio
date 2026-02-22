import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './components/Hero';
import CourseList from './components/CourseList';
import ReviewSection from './components/ReviewSection';
import AdminPanel from './components/AdminPanel';
import RegistrationForm from './components/RegistrationForm';
import WhatsAppButton from './components/WhatsAppButton';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function App() {
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  useEffect(() => {
    fetchPublicData();
    if (token) setIsAdmin(true);
  }, [token]);

  const fetchPublicData = async () => {
    try {
      const [resCourses, resReviews] = await Promise.all([
        axios.get(`${API_BASE}/courses`),
        axios.get(`${API_BASE}/reviews`)
      ]);
      setCourses(resCourses.data);
      setReviews(resReviews.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleRegister = async (registrationData) => {
    try {
      await axios.post(`${API_BASE}/registrations`, registrationData);
      setSelectedCourse(null);
      alert("Registration successful!");
    } catch (err) {
      alert("Error during registration");
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      await axios.post(`${API_BASE}/reviews`, reviewData);
    } catch (err) {
      console.error("Error adding review", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // In a real app, use FormData for OAuth2PasswordBearer
      const formData = new URLSearchParams();
      formData.append('username', loginData.username);
      formData.append('password', loginData.password);

      const res = await axios.post(`${API_BASE}/token`, formData);
      localStorage.setItem('adminToken', res.data.access_token);
      setToken(res.data.access_token);
      setIsAdmin(true);
      setShowLogin(false);
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAdmin(false);
  };

  if (isAdmin) {
    return <AdminPanel token={token} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      <nav style={{ padding: 'var(--spacing-md) 0', borderBottom: '1px solid #efefef', backgroundColor: 'white' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.2rem' }}>Visuddhi Foundation</div>
          <button onClick={() => setShowLogin(true)} style={{ fontSize: '0.8rem', opacity: 0.5 }}>Admin Login</button>
        </div>
      </nav>

      <Hero />
      <CourseList courses={courses} onRegister={setSelectedCourse} />
      <ReviewSection reviews={reviews} onAddReview={handleAddReview} />

      <footer className="section" style={{ borderTop: '1px solid #efefef', textAlign: 'center', opacity: 0.6 }}>
        <div className="container">
          <p>&copy; 2026 Dr. Yogesh Warke - Visuddhi Foundation. All rights reserved.</p>
        </div>
      </footer>

      {selectedCourse && (
        <RegistrationForm
          course={selectedCourse}
          onCancel={() => setSelectedCourse(null)}
          onSubmit={handleRegister}
        />
      )}

      {showLogin && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius)', width: '300px' }}>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                className="input"
                placeholder="Username"
                value={loginData.username}
                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              />
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '0.5rem' }}>Login</button>
              <button type="button" onClick={() => setShowLogin(false)} className="btn" style={{ width: '100%', background: '#eee' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <WhatsAppButton phoneNumber="1234567890" />
    </div>
  );
}

export default App;
