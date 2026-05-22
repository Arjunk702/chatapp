import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { MessageSquare, Settings, User, LogOut } from 'lucide-react';


const Navbar = () => {
  const { logout , authUser} = useAuthStore();
  return (
   <header className='fixed top-0 z-40 w-full border-b border-[#d3e4fe] bg-[#f8f9ff]/80 backdrop-blur-lg'>
    <div className='container mx-auto px-4 h-16'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center gap-8 '>
          <Link to="/" className='flex items-center gap-2.5 hover:opacity-90 transition-opacity'>
          <div className='w-9 h-9 rounded-xl bg-[#2563eb] flex items-center justify-center shadow-[0_6px_24px_rgba(0,74,198,0.25)]'>
          <MessageSquare className='w-5 h-5 text-white'/>

          </div>
          <h1 className='text-lg font-bold tracking-[-0.02em] text-[#004ac6]' >Messages</h1>
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <Link 
          to={"/settings"}
          className='inline-flex items-center gap-2 rounded-full border border-[#d3e4fe] bg-white/70 px-3 py-2 text-sm font-semibold text-[#0b1c30] shadow-[0_10px_30px_rgba(11,28,48,0.08)] hover:bg-white transition'
            >
              <Settings className='w-4 h-4'/>
              <span className='hidden sm:inline'>Settings</span>
            </Link>

            {authUser && (
              <>
              <Link
                to={"/profile"}
                className='inline-flex items-center gap-2 rounded-full border border-[#d3e4fe] bg-white/70 px-3 py-2 text-sm font-semibold text-[#0b1c30] shadow-[0_10px_30px_rgba(11,28,48,0.08)] hover:bg-white transition'
              >
              <User className='size-5 text-[#516070]'/>
              <span className='hidden sm:inline'>Profile</span>
              </Link>
              <button
                className='inline-flex items-center gap-2 rounded-full border border-[#d3e4fe] bg-white/70 px-3 py-2 text-sm font-semibold text-[#0b1c30] shadow-[0_10px_30px_rgba(11,28,48,0.08)] hover:bg-white transition'
                onClick={logout}
                type="button"
              >
                <LogOut className ="size-5 text-[#516070]"/>
                <span className='hidden sm:inline'>Logout</span>
              </button>
              </>
            )}

        </div>
      </div>
    </div>
    

   </header>
  )
}

export default Navbar
