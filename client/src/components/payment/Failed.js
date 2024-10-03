import React from 'react';

const Failed = () => {
  

    return (
        <div className="mt-[150px] h-[40vh] flex flex-col items-center justify-center bg-white rounded-3xl">
            <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
            {/* {paymentId && <p className="mt-4 text-lg text-gray-700">Payment ID: {paymentId}</p>} */}
            <p className="mt-4 text-lg text-gray-700">
                Please try again......
            </p>
            <a href="/cart" className="mt-6 px-4 py-2 bg-[#4A69E2] text-white rounded hover:bg-[#4a68e2cb]">
                Go to Cart
            </a>
        </div>
    );
};

export default Failed;