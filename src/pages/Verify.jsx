import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backend_url } = useContext(ShopContext);
    const [searchParams] = useSearchParams();


    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const userId = searchParams.get('userId'); 

    const verifyPayment = async () => {
        try {
            if (!token) return null;

            let response;

            
            if (window.location.pathname.includes('/verify-ssl')) {
            
                response = await axios.post(
                    `${backend_url}/api/order/verifySSL`, 
                    { orderId, success, userId }, 
                    { headers: { token } }
                );
            } else {
                
                response = await axios.post(
                    `${backend_url}/api/order/verifyStripe`, 
                    { orderId, success }, 
                    { headers: { token } }
                );
            }

            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
                toast.success(response.data.message || "Payment Successful!");
            } else {
                navigate('/cart');
                toast.error(response.data.message || "Payment Failed!");
            }

        } catch (error) {
            console.error("Verification Error:", error);
            toast.error("An error occurred during verification.");
            navigate('/cart');
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
            {/* রেসপন্সিভ লোডার ডিজাইন */}
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
            </div>
            
            <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-gray-800 text-center">
                Verifying Your Payment
            </h2>
            <p className="mt-2 text-gray-500 text-sm sm:text-base text-center max-w-xs">
                Please do not close the tab or refresh the page. This may take a moment.
            </p>
        </div>
    );
};

export default Verify;