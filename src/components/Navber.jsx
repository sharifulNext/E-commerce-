import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false); 
  const [showProfileMenu, setShowProfileMenu] = useState(false); 
  const profileMenuRef = useRef(null);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem("token");
    setToken('');
    setCartItems({});
    setShowProfileMenu(false);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLink = "flex flex-col items-center gap-1 text-black font-semibold";
  const normalLink = "flex flex-col items-center gap-1 hover:text-black transition-all duration-300";

  return (
    <div className='flex items-center justify-between py-5 font-medium border-b border-gray-100 relative'>
      
      {/* --- LOGO --- */}
      <Link to='/' className="text-2xl font-extrabold text-gray-900 tracking-tighter italic">
        CLOTH<span className='text-blue-600'>STORE.</span>
      </Link>

      {/* --- DESKTOP MENU --- */}
      <ul className='hidden sm:flex gap-8 text-sm text-gray-600'>
        <NavLink to='/' className={({ isActive }) => isActive ? activeLink : normalLink}>HOME</NavLink>
        <NavLink to='/collection' className={({ isActive }) => isActive ? activeLink : normalLink}>COLLECTION</NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? activeLink : normalLink}>ABOUT</NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? activeLink : normalLink}>CONTACT</NavLink>
      </ul>

      {/* --- ICONS & PROFILE --- */}
      <div className='flex items-center gap-6'>
        <img 
          onClick={() => { setShowSearch(true); navigate('/collection'); }} 
          src={assets.search_icon} 
          className='w-5 cursor-pointer hover:scale-110 transition-all' 
          alt="Search" 
        />

        {/* PROFILE SECTION (RESPONSED FIXED) */}
        <div className='relative' ref={profileMenuRef}>
          <img 
            onClick={() => token ? setShowProfileMenu(!showProfileMenu) : navigate('/login')} 
            className='w-5 cursor-pointer hover:opacity-70' 
            src={assets.profile_icon} 
            alt="Profile" 
          />
          
          {/* Dropdown Menu - Works on click for mobile and hover for desktop */}
          {token && showProfileMenu && (
            <div className='absolute right-0 top-full mt-3 w-48 bg-white border border-gray-100 shadow-2xl rounded-xl text-gray-600 z-[100]'>
              <div className='flex flex-col p-2'>
                <div className='px-4 py-2 border-b border-gray-50 mb-1'>
                  <p className='text-[10px] text-gray-400 uppercase font-bold tracking-widest text-center sm:text-left'>Account</p>
                </div>
                <p onClick={() => {navigate('/profile'); setShowProfileMenu(false)}} className='flex items-center gap-2 px-4 py-3 sm:py-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all text-sm'>
                  My Profile
                </p>
                <p onClick={() => {navigate('/orders'); setShowProfileMenu(false)}} className='flex items-center gap-2 px-4 py-3 sm:py-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all text-sm'>
                  My Orders
                </p>
                <button onClick={logout} className='w-full text-left flex items-center gap-2 px-4 py-3 sm:py-2 mt-1 border-t border-gray-50 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all text-sm'>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CART */}
        <Link to='/cart' className='relative group'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          {getCartCount() > 0 && (
            <p className='absolute -right-2 -bottom-2 w-4 h-4 text-center leading-4 bg-blue-600 text-white rounded-full text-[8px] font-bold'>
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* MOBILE MENU ICON */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
      </div>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed top-0 right-0 bottom-0 z-[1000] overflow-hidden bg-white transition-all duration-500 shadow-xl ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600 h-full'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-6 border-b border-gray-50 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
            <p className='font-bold uppercase tracking-widest'>Back</p>
          </div>
          <div className='flex flex-col mt-4'>
            <NavLink onClick={() => setVisible(false)} className='py-4 pl-10 border-b border-gray-50' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-4 pl-10 border-b border-gray-50' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-4 pl-10 border-b border-gray-50' to='/about'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-4 pl-10 border-b border-gray-50' to='/contact'>CONTACT</NavLink>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;