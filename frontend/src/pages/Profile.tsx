import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Save, CheckCircle2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { setCredentials } from '../redux/slices/userSlice';
import api from '../services/api';

const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  
  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.put('/users/profile', {
        name,
        email,
        password
      });
      dispatch(setCredentials(data));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold">My Profile</h1>
          <p className="text-gray-500 text-lg">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Password</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Leave blank to keep current"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
                  />
                </div>
              </div>

              {userInfo?.isAdmin && (
                <div className="flex items-center gap-3 p-4 bg-black text-white rounded-2xl">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">Administrator Account</span>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Updating...' : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-emerald-600 font-bold"
              >
                <CheckCircle2 className="w-5 h-5" />
                Profile updated successfully!
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
