import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate, Link } from 'react-router-dom'
import { useClerk, UserButton } from "@clerk/clerk-react"
import MenuItems from './MenuItems'
import { CirclePlus, LogOut, Sparkles } from 'lucide-react'
import { useSelector } from 'react-redux'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const { signOut } = useClerk();
  const user = useSelector((state) => state.user.value);

  return (
    <div className={`w-60 xl:w-72 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30 border-r border-indigo-100/50 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out shadow-xl`}>
      
      <div className='w-full'>
        {/* Logo Section */}
        <div className='px-6 py-5 mb-2'>
          <div 
            onClick={() => {
              setSidebarOpen(false);
              navigate('/');
            }} 
            className='flex items-center gap-3 cursor-pointer group'
          >
            <div className='w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'>
              <Sparkles className='w-5 h-5 text-white' />
            </div>
            <img src={assets.logo} alt="" className='h-7 object-contain' />
          </div>
        </div>

        <div className='h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent mb-6'></div>

        {/* Menu Items */}
        <MenuItems setSidebarOpen={setSidebarOpen} />

        {/* Create Post Button */}
        <div className='px-6 mt-6'>
          <Link 
            to={'/create-post'} 
            onClick={() => setSidebarOpen(false)} 
            className='flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-300 text-white cursor-pointer shadow-lg hover:shadow-xl group'
          >
            <CirclePlus className='w-5 h-5 group-hover:rotate-90 transition-transform duration-300' />
            <span className='font-semibold'>Create Post</span>
          </Link>
        </div>        
      </div>

      {/* User Profile Section */}
      <div className='w-full'>
        <div className='h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent mb-4'></div>
        
        <div className='px-6 pb-6'>
          <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-indigo-100/50 shadow-sm'>
            <div className='flex items-center justify-between mb-3'>
              <div className='flex gap-3 items-center flex-1'>
                <div className='relative'>
                  <UserButton />
                  <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                </div>
                <div className='flex-1 min-w-0'>
                  <h1 className='text-sm font-semibold text-gray-900 truncate'>
                    {user?.full_name || 'User'}
                  </h1>
                  <p className='text-xs text-gray-500 truncate'>
                    @{user?.username || 'username'}
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={signOut}
              className='w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 group'
            >
              <LogOut className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
              <span className='text-sm font-medium'>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar