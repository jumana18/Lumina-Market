import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Success = () => {
  return (
    <div className="pt-40 pb-20 px-6 text-center max-w-7xl mx-auto">
      <div className="bg-emerald-50 rounded-3xl p-20 flex flex-col items-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Thank you for your purchase. We've received your order and will notify you once it's on its way.
        </p>
        <Link to="/" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-colors">
          Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default Success;
