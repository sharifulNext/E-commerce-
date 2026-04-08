import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken,navigate,backend_url} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backend_url + "/api/user/register",{name,email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          navigate("/");
        }
        else{
          toast.error(response.data.message);
        }

      }
      else{
        const response = await axios.post(backend_url + "/api/user/login",{email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          
        }
        else{
          toast.error(response.data.message);
          
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error.message);
      toast.error("An error occurred during authentication. Please try again.");
      
    }
    
  };

  useEffect(()=>{
    if(token){
      navigate("/");
    }

  },[token])

 
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:w-[400px] m-auto mt-14 gap-4 text-gray-800 bg-white p-6 shadow-lg rounded-lg'>
      {/* Title */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-semibold'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Input Fields */}
      {currentState === 'Sign Up' && (
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-300 rounded' placeholder='Name' required />
      )}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-300 rounded' placeholder='Email' required />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-300 rounded' placeholder='Password' required />

      {/* Action Text */}
      <div className='w-full flex justify-between text-sm mt-2'>
        <p className='cursor-pointer text-blue-600'>Forgot your password?</p>
        <p onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} className='cursor-pointer text-blue-600 font-medium'>
          {currentState === 'Login' ? 'Create account' : 'Login here'}
        </p>
      </div>

      <button type="submit" className='w-full bg-black text-white py-2 rounded mt-2 hover:bg-gray-800 transition'>{currentState}</button>

    </form>
  );
};

export default Login;