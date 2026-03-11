import React, { useRef } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets'; 
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
      form.current, 
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
        toast.success("Message sent successfully!");
        form.current.reset();
    }, (error) => {
        toast.error("Failed to send message, please try again.");
    });
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Header */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        {/* Contact Image Side */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
            <img 
              className="w-full md:max-w-[480px] rounded-lg shadow-xl" 
              src={assets.contact_img} 
              alt="Contact Us" 
            />
            <div className="text-gray-500">
                <p className="font-semibold text-xl text-gray-800">Our Store</p>
                <p>5/A, Dhanmondi, Dhaka, Bangladesh</p>
                <p>Phone: +880 1305-****** <br /> Email: admin@clothstore.com</p>
            </div>
        </div>
        
        {/* Contact Form Side */}
        <form ref={form} onSubmit={sendEmail} className="w-full md:w-1/2 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <input type="text" name="user_name" placeholder="Your Name" className="border border-gray-300 px-4 py-3 rounded outline-none focus:border-black" required />
            <input type="email" name="user_email" placeholder="Your Email" className="border border-gray-300 px-4 py-3 rounded outline-none focus:border-black" required />
            <textarea name="message" placeholder="Your Message" className="border border-gray-300 px-4 py-3 h-32 rounded outline-none focus:border-black" required />
            <button type="submit" className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition rounded shadow-lg">SEND MESSAGE</button>
        </form>
      </div>

      {/* Google Maps Section */}
      <div className="mb-20">
        <h2 className="text-xl font-semibold mb-4">Find Us</h2>
        <iframe 
            src="https://www.google.com/maps/embed?..." 
            className="w-full h-[350px] rounded-lg shadow-lg border-0"
            allowFullScreen="" 
            loading="lazy">
        </iframe>
      </div>
    </div>
  );
};

export default Contact;