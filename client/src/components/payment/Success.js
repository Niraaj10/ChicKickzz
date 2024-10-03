import React from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Success = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    // const paymentId = params.get('paymentId');
    const { paymentId } = useParams();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100">
            <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
            {paymentId && <p className="mt-4 text-lg text-gray-700">Payment ID: {paymentId}</p>}
            <p className="mt-4 text-lg text-gray-700">
                Thank you for your purchase! Your transaction has been completed successfully.
            </p>
            <a href="/cart" className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Go to Cart
            </a>
        </div>
    );
};

export default Success;
