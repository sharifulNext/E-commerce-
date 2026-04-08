import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Profile = () => {
  const { token, navigate, setToken } = useContext(ShopContext);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <div className='min-h-screen bg-gray-50/50 pb-20'>
      <div className='h-40 sm:h-52 bg-gradient-to-r from-blue-600 to-indigo-700 w-full'></div>

      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative -mt-20'>
          
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8'>
            
            <div className='flex flex-col sm:flex-row items-center gap-6 border-b border-gray-50 pb-8'>
              <div className='relative'>
                <img 
                  src={assets.profile_icon} 
                  className='w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-gray-100 object-cover shadow-lg' 
                  alt="User Profile" 
                />
                <span className='absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full'></span>
              </div>
              
              <div className='text-center sm:text-left flex-1'>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>MD. Shariful Islam</h1>
                <p className='text-blue-600 font-medium'>Full Stack Developer</p>
                <div className='flex flex-wrap justify-center sm:justify-start gap-2 mt-3'>
                  <span className='px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full'>MERN Stack</span>
                  <span className='px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full'>Next.js Expert</span>
                </div>
              </div>

              <div className='flex gap-3 w-full sm:w-auto'>
                <button className='flex-1 sm:flex-none px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium'>
                  Edit Profile
                </button>
              </div>
            </div>

    
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
              
              <div className='lg:col-span-2 space-y-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div className='p-4 bg-gray-50 rounded-xl'>
                    <p className='text-xs text-gray-400 uppercase font-bold tracking-wider mb-1'>Email</p>
                    <p className='text-gray-700 font-medium break-all'>shariful.dev@example.com</p>
                  </div>
                  <div className='p-4 bg-gray-50 rounded-xl'>
                    <p className='text-xs text-gray-400 uppercase font-bold tracking-wider mb-1'>Phone</p>
                    <p className='text-gray-700 font-medium'>+880 17XX-XXXXXX</p>
                  </div>
                  <div className='p-4 bg-gray-50 rounded-xl sm:col-span-2'>
                    <p className='text-xs text-gray-400 uppercase font-bold tracking-wider mb-1'>Shipping Address</p>
                    <p className='text-gray-700 font-medium text-sm'>
                      Habiganj, Sylhet Division, Bangladesh.
                    </p>
                  </div>
                </div>

                {/* স্ট্যাটাস সেকশন */}
                <div className='grid grid-cols-3 gap-4'>
                  <div className='text-center p-4 border border-gray-100 rounded-2xl'>
                    <p className='text-xl sm:text-2xl font-bold text-gray-900'>08</p>
                    <p className='text-[10px] sm:text-xs text-gray-500 uppercase font-bold'>Orders</p>
                  </div>
                  <div className='text-center p-4 border border-gray-100 rounded-2xl'>
                    <p className='text-xl sm:text-2xl font-bold text-gray-900'>02</p>
                    <p className='text-[10px] sm:text-xs text-gray-500 uppercase font-bold'>Pending</p>
                  </div>
                  <div className='text-center p-4 border border-gray-100 rounded-2xl'>
                    <p className='text-xl sm:text-2xl font-bold text-gray-900'>15</p>
                    <p className='text-[10px] sm:text-xs text-gray-500 uppercase font-bold'>Wishlist</p>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='bg-gray-900 text-white p-6 rounded-2xl shadow-xl shadow-gray-200'>
                  <h3 className='font-bold mb-4'>Quick Actions</h3>
                  <div className='space-y-3'>
                    <button 
                      onClick={() => navigate('/orders')}
                      className='w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm'
                    >
                      Track My Orders
                      <span className='text-lg'>→</span>
                    </button>
                    <button 
                      onClick={() => navigate('/cart')}
                      className='w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm'
                    >
                      Go to Cart
                      <span className='text-lg'>→</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className='w-full p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-all text-sm font-bold border border-red-500/20'
                    >
                      Sign Out
                    </button>
                  </div>
                </div>

                <div className='p-6 bg-blue-50 rounded-2xl border border-blue-100'>
                  <p className='text-blue-800 text-sm font-bold'>Need help?</p>
                  <p className='text-blue-600 text-xs mt-1'>Contact our 24/7 support for any order issues.</p>
                  <button className='mt-4 text-xs font-bold text-blue-700 underline'>Contact Support</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;