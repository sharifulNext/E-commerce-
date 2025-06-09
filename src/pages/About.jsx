import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="px-4">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 items-center">
        <img
          className="w-full md:max-w-[450px] rounded shadow-md"
          src={assets.about_img}
          alt="About Cloth Store"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/3 text-gray-600 text-[17px] leading-7">
          <p>
            Cloth Store was born out of a passion for innovation and a desire to redefine the online shopping experience. We believe that fashion should be accessible, stylish, and convenient. From everyday essentials to standout pieces, our mission is to bring you quality clothing that fits your lifestyle.
          </p>
          <p>
            Our dedicated team carefully curates each collection to reflect the latest trends while maintaining comfort and affordability. Whether you’re dressing for a casual outing, a workday, or a special event, Cloth Store is here to make sure you always look and feel your best.
          </p>
          <b className='text-gray-800'>Our Mission</b>
            <p>
               Our mission is to provide high-quality, affordable clothing that empowers individuals to express their unique style confidently. We strive to create a seamless shopping experience by combining innovation, customer service, and sustainable practices to make fashion accessible to everyone.
            </p>

        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
           <p className='text-gray-600'>
               We are committed to maintaining the highest standards of quality in every product we offer. From sourcing premium materials to rigorous quality checks, our team ensures that each item meets our excellence criteria before it reaches you.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
           <p className='text-gray-600'>
             Shopping with us is designed to be easy and hassle-free. With a user-friendly interface, fast delivery, and secure payment options, we aim to make your experience as smooth and enjoyable as possible from browsing to checkout.
          </p>

        </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
          Our dedicated support team is always here to assist you. Whether you have a question, need help with your order, or simply want style advice, we are committed to providing friendly, fast, and reliable service every step of the way.
         </p>   

        </div>
  
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
