import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../services/api';
import { useAppContext } from '../context/AppContext';


export const LoginForm = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const { fetchUser } = useAppContext();

  const navigate = useNavigate(); 

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);


  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setMessage({ text: 'Please fill all fields', type: 'error' });
        return;
      }
      const data = await login(email, password, rememberMe);
      setMessage({ 
        text: 'Login successful! Redirecting...', 
        type: 'success' 
      });

      if (data.token) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", data.token);
        await fetchUser();
        navigate("/");
      }
    } catch (err) {
      let errorMessage = 'Login failed';
      if (err.response) {
        errorMessage = err.response.data.error || err.message;
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
          <button className='font-medium text-base text-red-600'>Forgot password</button>
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button
            onClick={handleLogin}
            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-red-600 text-white text-lg font-bold'
          >
            Sign in
          </button>
        </div>
        <div className='mt-8 flex justify-center items-center'>
          <p className='font-medium text-base'>Don't have an account?</p>
          <button onClick={onToggleForm} className='text-red-600 text-base font-medium ml-2'>Sign up</button>
        </div>
      </div>
    </div>
  );
};