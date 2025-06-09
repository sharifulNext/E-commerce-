import React from 'react'


const Footer = () => {
  return (
    <div>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <p className="text-2xl font-bold text-gray-800 mb-5">Cloth Store</p>

            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est ut nulla assumenda debitis adipisci dolorum magnam, fugiat molestias voluptas dicta?
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>

            </ul>
        </div>

         <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>01305242248</li>
                <li>sharifulislam242248@gmail.com</li>

            </ul>
         </div>
       </div>

       <div>
         <hr className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200' />
         <p className='py-5 text-sm text-center '>Copyright 2025@ forever.com - All Right Reserved.</p>

       </div>
    </div>
  )
}

export default Footer
