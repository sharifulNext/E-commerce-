import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // default: cash on delivery

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = () => {
    const allFilled = Object.values(form).every((value) => value.trim() !== '');
    if (!allFilled) {
      alert('Please fill out all the fields!');
      return;
    }

    const orderData = { ...form, paymentMethod };
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrders = [...existingOrders, orderData];
    localStorage.setItem('orders', JSON.stringify(newOrders));

    if (paymentMethod === 'sslcommerz') {
      alert('Redirecting to SSLCOMMERZ...');
      // Replace with your actual SSLCOMMERZ redirect logic or API call
      window.location.href = 'https://sandbox.sslcommerz.com/gwprocess/v4/gw.php';
    } else {
      alert('Order placed successfully with Cash on Delivery!');
      navigate('/orders');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input name="firstName" value={form.firstName} onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" placeholder="First name" />
          <input name="lastName" value={form.lastName} onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" placeholder="Last name" />
        </div>
        <input name="email" value={form.email} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email" placeholder="Email address" />
        <input name="street" value={form.street} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input name="city" value={form.city} onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" placeholder="City" />
          <input name="state" value={form.state} onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input name="zipcode" value={form.zipcode} onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number" placeholder="Zipcode" />
          <input name="country" value={form.country} onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" placeholder="Country" />
        </div>
        <input name="phone" value={form.phone} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number" placeholder="Phone" />
      </div>

      {/* Right Side - Cart Total & Payment */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* Payment Options */}
          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            {/* Cash On Delivery */}
            <div
              onClick={() => setPaymentMethod('cod')}
              className={`flex items-center gap-3 border p-2 px-3 rounded cursor-pointer ${
                paymentMethod === 'cod' ? 'border-black' : 'border-gray-300'
              }`}
            >
              <div className={`min-w-3.5 h-3.5 border rounded-full ${
                paymentMethod === 'cod' ? 'bg-black' : 'bg-white'
              }`}></div>
              <p className="text-gray-500 text-sm font-medium mx-4">Cash On Delivery</p>
            </div>

            {/* SSLCOMMERZ */}
            <div
              onClick={() => setPaymentMethod('sslcommerz')}
              className={`flex items-center gap-3 border p-2 px-3 rounded cursor-pointer ${
                paymentMethod === 'sslcommerz' ? 'border-black' : 'border-gray-300'
              }`}
            >
              <div className={`min-w-3.5 h-3.5 border rounded-full ${
                paymentMethod === 'sslcommerz' ? 'bg-black' : 'bg-white'
              }`}></div>
              <p className="text-gray-500 text-sm font-medium mx-4">Pay with SSLCOMMERZ</p>
              <img
                src="https://www.sslcommerz.com/wp-content/uploads/2022/02/SSLCOMMERZ-Logo.png"
                alt="SSLCOMMERZ Logo"
                className="h-5"
              />
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handleOrderSubmit}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 mt-8 rounded w-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
