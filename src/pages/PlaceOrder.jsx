import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  // 1. State Management 
  const [method, setMethod] = useState('cod');
  const { navigate, backend_url, token, cartItems,setCartItems,getCartAmount, delivery_fee, products } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  // 2. Order Submission Handler (Connecting to Backend)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        // Cash on Delivery Case
        case 'cod': {
            const response = await axios.post(backend_url + '/api/order/place', orderData, {headers: {token}});
            if(response.data.success) {
                 setCartItems({});
                 navigate('/orders');

            }else{
                toast.error(response.data.message);
            }
            break;
        }
          
            default:
               break;
          } 
         
      } catch (error){
        console.log(error);
        toast.error("Error while placing order. Please try again.");
      }
      
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4">
      
      {/* --- Left Side: Delivery Information (Responsive Width) --- */}
      <div className="flex flex-col gap-4 w-full lg:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required name="firstName" onChange={onChangeHandler} value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
          <input required name="lastName" onChange={onChangeHandler} value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input required name="city" onChange={onChangeHandler} value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required name="zipcode" onChange={onChangeHandler} value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required name="country" onChange={onChangeHandler} value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
      </div>

      {/* --- Right Side: Payment and Total --- */}
      <div className="mt-8 w-full lg:max-w-[500px]">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment Method Selection (Responsive Grid) */}
         <div className="flex flex-col lg:flex-row gap-3 mt-4">
  
  {/* Stripe Option */}
  <div onClick={() => setMethod('stripe')} 
       className={`flex items-center gap-3 border p-2 px-4 cursor-pointer flex-1 min-w-[150px] ${method === 'stripe' ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
    <p className={`min-w-[14px] h-[14px] border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
    <div className="flex justify-center w-full">
        <img className="h-5 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" />
    </div>
  </div>

  {/* Razorpay Option */}
  <div onClick={() => setMethod('razorpay')} 
       className={`flex items-center gap-3 border p-2 px-4 cursor-pointer flex-1 min-w-[150px] ${method === 'razorpay' ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
    <p className={`min-w-[14px] h-[14px] border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
    <div className="flex justify-center w-full">
        <img className="h-5 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" />
    </div>
  </div>

  {/* COD Option */}
  <div onClick={() => setMethod('cod')} 
       className={`flex items-center gap-3 border p-2 px-4 cursor-pointer flex-1 min-w-[150px] ${method === 'cod' ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
    <p className={`min-w-[14px] h-[14px] border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
    <p className="text-gray-500 text-[10px] sm:text-xs font-medium uppercase whitespace-nowrap">Cash On Delivery</p>
  </div>

</div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm active:bg-gray-700">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;