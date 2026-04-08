import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <p className="text-2xl font-bold text-gray-800 mb-5">Cloth Store</p>
          <p className='w-full md:w-2/3 text-gray-600'>
            Your premier destination for high-quality, trendy apparel. We are committed to providing you with the best shopping experience, focusing on reliability, customer service, and unique style.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
            <li className='hover:text-black transition'>Home</li>
            <li className='hover:text-black transition'>About</li>
            <li className='hover:text-black transition'>Delivery</li>
            <li className='hover:text-black transition'>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+880 1305 242 248</li>
            <li>sharifulislam242248@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className='border-gray-200' />
        <p className='py-5 text-sm text-center text-gray-500'>
          Copyright 2026 @ ClothStore.com - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer