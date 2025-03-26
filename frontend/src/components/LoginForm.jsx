import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../services/api';

export const LoginForm = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const data = await login(email, password, rememberMe);
      if (data.token) {
        // Use sessionStorage for temporary sessions
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", data.token);
        storage.setItem("username", data.username);
        navigate("/");
      }
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };
  
  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
      <h1 className='text-5xl font-semibold'>Welcome Back</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
      <div className='mt-8'>
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
        <div className='mt-8 flex justify-between items-center'>
          <div>
            <input
              type="checkbox"
              id='remember'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className='ml-2 font-medium text-base'>Remember me</label>
          </div>
          <button className='font-medium text-base text-violet-500'>Forgot password</button>
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button
            onClick={handleLogin}
            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
          >
            Sign in
          </button>
        </div>
        <div className='mt-8 flex justify-center items-center'>
          <p className='font-medium text-base'>Don't have an account?</p>
          <button onClick={onToggleForm} className='text-violet-500 text-base font-medium ml-2'>Sign up</button>
        </div>
      </div>
    </div>
  );
};