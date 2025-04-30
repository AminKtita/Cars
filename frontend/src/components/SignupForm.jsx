import React, { useState } from 'react';
import { signup } from '../services/api'; 
import { NavLink } from 'react-router-dom'


export const SignupForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const data = await signup(username, email, password); 
      if (data.message) {
        alert("Signup successful! Please log in.");
        onToggleForm(); // Switch to the login form after successful signup
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
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
        <div>
            <input
              type="checkbox"
              id='terms'
            />
            <label htmlFor="terms" className='ml-2 font-medium text-base'>I Agree <NavLink to="/terms" className='font-medium text-base text-red-600'>Terms 🙴 Polices</NavLink></label>
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