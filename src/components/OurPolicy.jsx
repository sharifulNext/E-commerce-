import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'; 

const OurPolicy = () => {
  return (
    <div className='my-10'>
      {/* Section Title */}
      <div className='text-center py-8 text-3xl'>
        <Title text1={'OUR'} text2={'POLICIES'} />
      </div>

      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-12 text-xs sm:text-sm md:text-base text-gray-700'>
        
        {/* Exchange Policy */}
        <div>
          <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Exchange Icon" />
          <p className='font-semibold'>Easy Exchange Policy</p>
          <p className='text-gray-400'>We offer a hassle-free exchange policy for all orders.</p>
        </div>

        {/* Quality/Return Policy */}
        <div>
          <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Return Icon" />
          <p className='font-semibold'>7 Days Return Policy</p>
          <p className='text-gray-400'>We provide a 7-day free return policy for any issues.</p>
        </div>

        {/* Customer Support */}
        <div>
          <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Support Icon" />
          <p className='font-semibold'>Best Customer Support</p>
          <p className='text-gray-400'>We provide 24/7 customer support for our clients.</p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy