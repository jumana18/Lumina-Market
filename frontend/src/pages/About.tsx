import React from 'react';

const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight mb-12">Our Story</h1>
      <div className="prose prose-zinc lg:prose-xl">
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Founded in 2024, LUMINA was born out of a desire to bring minimalist, high-quality essentials to the modern home and lifestyle.
        </p>
        <p className="text-gray-600 leading-relaxed mb-8">
          We believe that the objects we surround ourselves with should be both beautiful and functional. Every product in our collection is carefully vetted for its design integrity, material quality, and ethical production.
        </p>
        <div className="bg-emerald-50 p-8 rounded-3xl mb-8">
          <h3 className="text-emerald-900 font-bold mb-4">Our Mission</h3>
          <p className="text-emerald-800">To elevate the everyday through curated design and uncompromising quality.</p>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Thank you for being part of our journey. We are committed to continuing our search for the world's best essentials, delivered straight to your door.
        </p>
      </div>
    </div>
  );
};

export default About;
