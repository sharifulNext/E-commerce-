import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const PlaceOrder = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', street: '', 
    city: '', state: '', zipcode: '', country: '', phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod'); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async () => {
    // ফরম ভ্যালিডেশন
    if (Object.values(form).some((v) => v.trim() === '')) {
      alert('Please fill out all the fields!');
      return;
    }

    // পেমেন্ট গেটওয়ে লজিক
    switch (paymentMethod) {
      case 'stripe':
        alert('Redirecting to Stripe Secure Checkout...');
        // এখানে Stripe Integration কোড বসবে
        break;
      case 'sslcommerz':
        alert('Redirecting to SSLCOMMERZ gateway...');
        window.location.href = 'https://sandbox.sslcommerz.com/gwprocess/v4/gw.php';
        break;
      case 'cod':
      default:
        alert('Order placed successfully via Cash on Delivery!');
        navigate('/orders');
        break;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-12 pt-10 border-t min-h-[80vh] px-4 sm:px-[9vw]">
      
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        <div className="flex gap-3">
          <input name="firstName" value={form.firstName} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="text" placeholder="First name" required />
          <input name="lastName" value={form.lastName} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="text" placeholder="Last name" required />
        </div>
        <input name="email" value={form.email} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="email" placeholder="Email address" required />
        <input name="street" value={form.street} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="text" placeholder="Street" required />
        <div className="flex gap-3">
          <input name="city" value={form.city} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="text" placeholder="City" required />
          <input name="state" value={form.state} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="text" placeholder="State" required />
        </div>
        <div className="flex gap-3">
          <input name="zipcode" value={form.zipcode} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="number" placeholder="Zipcode" required />
          <input name="country" value={form.country} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="text" placeholder="Country" required />
        </div>
        <input name="phone" value={form.phone} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" type="number" placeholder="Phone" required />
      </div>

      {/* Right Side - Payment & Cart */}
      <div className="w-full sm:max-w-[400px]">
        <CartTotal />
        <div className="mt-10">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex flex-col gap-3 mt-4">
            <PaymentOption label="Cash On Delivery" value="cod" selected={paymentMethod} setMethod={setPaymentMethod} icon="🚚" />
            <PaymentOption label="Pay with Stripe" value="stripe" selected={paymentMethod} setMethod={setPaymentMethod} icon="💳" />
            <PaymentOption label="Pay with SSLCOMMERZ" value="sslcommerz" selected={paymentMethod} setMethod={setPaymentMethod} img="https://www.sslcommerz.com/wp-content/uploads/2022/02/SSLCOMMERZ-Logo.png" />
          </div>

          <button onClick={handleOrderSubmit} className="bg-black text-white px-10 py-3 mt-8 w-full rounded hover:bg-gray-800 transition-all duration-300">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment Option Component
const PaymentOption = ({ label, value, selected, setMethod, icon, img }) => (
  <div onClick={() => setMethod(value)} className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition ${selected === value ? 'border-black' : 'border-gray-300'}`}>
    <div className={`w-4 h-4 border rounded-full ${selected === value ? 'bg-black' : 'bg-white'}`}></div>
    {icon && <span>{icon}</span>}
    {img && <img src={img} alt={label} className="h-6" />}
    <p className="text-sm font-medium">{label}</p>
  </div>
);

export default PlaceOrder;