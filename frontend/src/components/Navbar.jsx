import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { CarContext } from '../context/CarContext';

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch } = useContext(CarContext);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <NavLink className='flex flex-col items-center gap-l' to={`/`}>
      <img src={assets.logo} className='w-36' alt="" />
      </NavLink>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink className='flex flex-col items-center gap-1' to={`/`}>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
      </div>
      <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='' />

      {/* Sliding Menu with z-index */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'} z-50`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 p1-6 border'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 p1-6 border'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 p1-6 border'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};