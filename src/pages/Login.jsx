import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const  onSubmitHandler = async (event) => {
    event.preventDefault();

  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      {/* Title */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-semibold'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Input Fields */}
      {currentState === 'Sign Up' && (
        <input
          type="text"
          className='w-full px-3 py-2 border border-gray-300 rounded'
          placeholder='Name'
          required
        />
      )}

      <input
        type="email"
        className='w-full px-3 py-2 border border-gray-300 rounded'
        placeholder='Email'
        required
      />
      <input
        type="password"
        className='w-full px-3 py-2 border border-gray-300 rounded'
        placeholder='Password'
        required
      />

      {/* Action Text */}
      <div className='w-full flex justify-between text-sm mt-2'>
        <p className='cursor-pointer text-blue-600 hover:underline'>
          Forgot your password?
        </p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className='cursor-pointer text-blue-600 hover:underline'
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className='cursor-pointer text-blue-600 hover:underline'
          >
            Login here
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className='w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800 transition-all duration-200'
      >
        {currentState}
      </button>
    </form>
  );
};

export default Login;
