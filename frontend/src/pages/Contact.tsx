import React from 'react';
import { Info, Truck } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight mb-12">Contact Us</h1>
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-6">Have a question about our products or your order? We're here to help.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                  <p className="font-medium">support@lumina.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Shipping</p>
                  <p className="font-medium">Global Delivery Available</p>
                </div>
              </div>
            </div>
          </div>
          <form className="space-y-4 bg-gray-50 p-8 rounded-3xl" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold mb-2">Name</label>
              <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Message</label>
              <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 resize-none"></textarea>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-emerald-600 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
