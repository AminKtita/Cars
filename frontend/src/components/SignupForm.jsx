import React, { useState, useEffect } from 'react';
import { signup } from '../services/api';
import { NavLink } from 'react-router-dom';

export const SignupForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  const handleSignup = async () => {
    setMessage({ text: '', type: '' });

    if (!username || !email || !password ) {
      setMessage({ text: 'Please fill all fields', type: 'error' });
      return;
    }

    if (username.length < 8) {
      setMessage({ text: 'Username must be at least 8 characters', type: 'error' });
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage({ 
        text: 'Password must contain at least one letter, number, and special character', 
        type: 'error' 
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: 'Email is not valid', type: 'error' });
      return;
    }

    if (!termsAgreed) {
      setMessage({ text: 'You must agree to the terms and policies', type: 'error' });
      return;
    }

    try {
      const data = await signup(username, email, password);
      setMessage({ 
        text: 'Signup successful! Redirecting to login...', 
        type: 'success' 
      });
      setTimeout(() => onToggleForm(), 2000);
    } catch (err) {
      let errorMessage = 'Signup failed';
      if (err.response?.data?.error) {
        const error = err.response.data.error;
          errorMessage = err.response.data.error || err.message;
        if (error.includes('E11000')) {
          // Check which field caused the duplicate error
          if (error.includes('email_1')) {
            errorMessage = 'User already exists with this email';
          } else if (error.includes('username_1')) {
            errorMessage = 'Username is already taken';
          } else {
            errorMessage = 'User already exists with this information';
          }
        } else {
          errorMessage = error;
        }
  
      }
      setMessage({ text: errorMessage, type: 'error' });
    }
  };

  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 relative'>
      {message.text && (
        <div className={`absolute -top-8 left-0 right-0 mx-auto p-3 rounded-lg text-center w-3/4 ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
      <h1 className='text-5xl font-semibold'>Create Account</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>Don't have an account? Register now.</p>
      <div className='mt-8'>
        <div>
          <label className='text-lg font-medium'>Username</label>
          <input
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            type="text"
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className='text-lg font-medium'>Email</label>
          <input
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className='text-lg font-medium'>Password</label>
          <input
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <input
            type="checkbox"
            id='terms'
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
          />
          <label htmlFor="terms" className='ml-2 font-medium text-base'>
            I Agree <NavLink to="/terms" className='font-medium text-base text-red-600'>Terms & Policies</NavLink>
          </label>
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button
            onClick={handleSignup}
            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-red-600 text-white text-lg font-bold'
          >
            Sign up
          </button>
        </div>
        <div className='mt-8 flex justify-center items-center'>
          <p className='font-medium text-base'>Already have an account?</p>
          <button onClick={onToggleForm} className='text-red-600 text-base font-medium ml-2'>Sign in</button>
        </div>
      </div>
    </div>
  );
};