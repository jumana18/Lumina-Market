import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="pt-40 pb-20 px-6 text-center max-w-7xl mx-auto">
      <div className="bg-gray-50 rounded-3xl p-20 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
