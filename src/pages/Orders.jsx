import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Package, Truck, Clock } from 'lucide-react';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className='border-t pt-16 px-4 sm:px-[9vw]'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='flex flex-col gap-4'>
        {products.slice(1, 4).map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            
            {/* Order Details */}
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-20 sm:w-24 rounded-md shadow-sm' src={item.image[0]} alt={item.name} />
              <div className='flex flex-col gap-1'>
                <p className='text-base font-semibold text-gray-900'>{item.name}</p>
                <div className='flex items-center gap-3 text-sm text-gray-700'>
                  <p className='font-bold'>{currency}{item.price}</p>
                  <p className='bg-gray-100 px-2 py-0.5 rounded'>Qty: 1</p>
                  <p className='bg-gray-100 px-2 py-0.5 rounded'>Size: M</p>
                </div>
                <p className='text-xs text-gray-500 mt-1 flex items-center gap-1'>
                  <Clock size={12} /> Date: <span className='text-gray-700 font-medium'>4, Jun, 2025</span>
                </p>
              </div>
            </div>

            {/* Status & Action */}
            <div className='md:w-1/3 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <span className='min-w-2 h-2 rounded-full bg-green-500 animate-pulse'></span>
                <p className='text-sm md:text-base font-medium text-gray-600'>Ready to ship</p>
              </div>
              <button className='border px-4 py-2 text-sm font-medium rounded hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2'>
                <Truck size={16} /> Track Order
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;  