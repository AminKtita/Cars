import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';

export const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <SignupForm onToggleForm={toggleForm} />
        )}
      </div>
      <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white border-2 border-gray-200 rounded-3xl'>
        <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin' />
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'/>
      </div>
    </div>
  );
};