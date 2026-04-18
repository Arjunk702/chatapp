import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, MessageSquare, Lock, Loader2, User } from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-base-100'>
      {/* Left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='flex flex-col items-center gap-2 group'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105'>
              <MessageSquare className='size-8 text-white' />
            </div>
            <h1 className='text-3xl font-bold mt-4 bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent'>Welcome Back</h1>
            <p className='text-base-content/60 text-sm'>Sign in to continue your conversations</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className='space-y-5 w-full max-w-sm'>
          {/* Email Field */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-sm'>Email</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10'>
                <Mail className='size-5 text-base-content/50' />
              </div>
              <input
                type='text'
                className={`input input-bordered w-full pl-12 h-12 bg-base-200/50 focus:bg-base-200 transition-all duration-200 rounded-xl`}
                placeholder='Enter Your Email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-sm'>Password</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10'>
                <Lock className='size-5 text-base-content/50' />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`input input-bordered w-full pl-12 h-12 bg-base-200/50 focus:bg-base-200 transition-all duration-200 rounded-xl`}
                placeholder='.........'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-base-200/50 rounded-r-xl transition-colors z-10'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className='size-5 text-base-content/50' /> : <Eye className='size-5 text-base-content/50' />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='btn btn-primary w-full h-12 mt-2 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-200'
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className='size-5 animate-spin' />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign-up Link */}
        <div className='text-center mt-4'>
          <p className='text-base-content/70 text-sm'>
            Don't have an account?{' '}
            <Link to='/signup' className='link link-primary font-medium ml-1'>
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones"
      />
    </div>
  );
};

export default LoginPage;
