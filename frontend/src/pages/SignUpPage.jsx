import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { EyeOff,Eye, Lock, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {

    const [showPassword,setShowPassword] =useState(false);
    const [formData,setFormData] = useState({
      fullName : "",
      email : "",
      password : "",

    })
    const {signup, isSigningUp} = useAuthStore();

    const validateForm = () =>{
      if  (!formData.fullName.trim()) return toast.error("Full name is required")
      if  (!formData.email.trim()) return toast.error("Email is required")
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
          return toast.error("Invalid email format");
        }
        
      if  (!formData.password.trim()) return toast.error("Password is required")
      if  (formData.password.length < 6) return toast.error("Password must be at least 6 characters")
        return true;
    }
    const handleSubmit = (e) =>{
      e.preventDefault()

      const success = validateForm();

      if (success === true) signup(formData)
    }

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-base-100'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* logo */}
          <div className='flex flex-col items-center gap-2 group'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105'>
          <MessageSquare className='size-8 text-white'/>

            </div>
            <h1 className='text-3xl font-bold mt-4 bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent'>Create Account</h1>
            <p className='text-base-content/60 text-sm'>Get started with your free account</p>

          </div>

        </div>
        <form onSubmit={handleSubmit} className='space-y-5 w-full max-w-sm'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-sm'>Full Name</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10'>
                <User className = "size-5 text-base-content/50"/>

              </div>
              <input 
              type="text"
              className={`input input-bordered w-full pl-12 h-12 bg-base-200/50 focus:bg-base-200 transition-all duration-200 rounded-xl`}
              placeholder='Enter Your Name'
              value={formData.fullName}
              onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
               />

            </div>

          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-sm'>Email</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10'>
                <Mail className = "size-5 text-base-content/50"/>

              </div>
              <input 
              type="text"
              className={`input input-bordered w-full pl-12 h-12 bg-base-200/50 focus:bg-base-200 transition-all duration-200 rounded-xl`}
              placeholder='Enter Your Email'
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
               />

            </div>
            </div>
            <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-sm'>Password</span>
            </label>
<div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10'>
                <Lock className = "size-5 text-base-content/50"/>

              </div>
              <input 
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full pl-12 h-12 bg-base-200/50 focus:bg-base-200 transition-all duration-200 rounded-xl`}
              placeholder='.........'
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
               />
               <button
                 type='button'
                 className='absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-base-200/50 rounded-r-xl transition-colors z-10'
                 onClick={()=>setShowPassword(!showPassword)}
                 >
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/50'/>
                  ) : (
                    <Eye className="size-5 text-base-content/50"/>
                  )}

                 </button>

            </div>
            </div>
            <button
            type='submit'
            className='btn btn-primary w-full h-12 mt-2 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-200' disabled={isSigningUp}

            >
              {isSigningUp ? (
                <>
                <Loader2 className='size-5 animate-spin'/>
                Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
        </form>
        <div className="text-center mt-4">
          <p className='text-base-content/70 text-sm'>
          Already have an account ?{""} 
          <Link to="/login" className='link link-primary font-medium ml-1'>
          Sign in
          </Link>
          
          </p>
        </div>
      </div>

      {/* right side*/}


      <AuthImagePattern
      title = "Join our community"
      subtitle="Connect with friends, share moments , and stay in touch with your loved ones"
      
       />
      


    </div>
    
  )
}

export default SignUpPage