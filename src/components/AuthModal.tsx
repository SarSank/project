import React, { useState } from 'react';
import axios from 'axios';
import './AuthModal.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLoginTab, setIsLoginTab] = useState(true);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: formData.email,
                password: formData.password
            });
            
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard';
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Login failed');
            } else {
                setMessage('An error occurred during login');
            }
            console.error('Login error:', error);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard';
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Signup failed');
            } else {
                setMessage('An error occurred during signup');
            }
            console.error('Signup error:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="auth-modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <div className="tabs">
                    <div 
                        className={`tab ${isLoginTab ? 'active' : ''}`}
                        onClick={() => setIsLoginTab(true)}
                    >
                        Login
                    </div>
                    <div 
                        className={`tab ${!isLoginTab ? 'active' : ''}`}
                        onClick={() => setIsLoginTab(false)}
                    >
                        Sign Up
                    </div>
                </div>

                {isLoginTab ? (
                    <form onSubmit={handleLogin} className="form-container">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <button type="submit" className="button">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup} className="form-container">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupEmail">Email</label>
                            <input 
                                type="email" 
                                id="signupEmail"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupPassword">Password</label>
                            <input 
                                type="password" 
                                id="signupPassword"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <button type="submit" className="button">Sign Up</button>
                    </form>
                )}

                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export default AuthModal; 