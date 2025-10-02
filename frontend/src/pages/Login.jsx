import React from 'react'
import { assets } from '../assets/assets.js'
import { Star, Users, Sparkles, Globe2 } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

function Login() {
  return (
    <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      <div className='relative min-h-screen flex flex-col md:flex-row items-center justify-between gap-8 p-6 md:p-12 lg:px-20'>
        {/* Left side - Hero Content */}
        <div className='flex-1 max-w-2xl space-y-8 z-10'>
          {/* Logo */}
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg'>
              <Sparkles className='w-6 h-6 text-white' />
            </div>
            <img src={assets.logo} className='h-8 object-contain' alt="PingUp" />
          </div>

          {/* Main Heading */}
          <div className='space-y-4'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-indigo-100'>
              <Globe2 className='w-4 h-4 text-indigo-600' />
              <span className='text-sm font-medium text-indigo-900'>Connect Globally</span>
            </div>
            
            <h1 className='text-5xl md:text-7xl font-bold leading-tight'>
              <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                More than friends,
              </span>
              <br />
              <span className='text-gray-900'>truly connect</span>
            </h1>
            
            <p className='text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed'>
              Join a vibrant global community where meaningful connections happen naturally.
            </p>
          </div>

          {/* Social Proof */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
            {/* Users */}
            <div className='flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-indigo-100'>
              <div className='flex -space-x-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full border-2 border-white'></div>
                <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white'></div>
                <div className='w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full border-2 border-white'></div>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-900'>12k+</p>
                <p className='text-sm text-gray-600'>Active Developers</p>
              </div>
            </div>

            {/* Rating */}
            <div className='bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-indigo-100'>
              <div className='flex gap-1 mb-1'>
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className='w-5 h-5 text-amber-400 fill-amber-400' />
                ))}
              </div>
              <p className='text-sm text-gray-600'>Rated 5.0 stars</p>
            </div>
          </div>

          {/* Features */}
          <div className='hidden md:grid grid-cols-2 gap-4 pt-4'>
            <div className='flex items-start gap-3'>
              <div className='w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                <Users className='w-5 h-5 text-indigo-600' />
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Global Network</h3>
                <p className='text-sm text-gray-600'>Connect with developers worldwide</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                <Sparkles className='w-5 h-5 text-purple-600' />
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Real Connections</h3>
                <p className='text-sm text-gray-600'>Build meaningful relationships</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - SignIn Form */}
        <div className=' flex justify-center flex-1 max-w-md w-full z-10'>
          <div className='bg-white/90 backdrop-blur-xl  rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10'>
            <div className='mb-6'>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>Welcome back</h2>
              <p className='text-gray-600'>Sign in to continue your journey</p>
            </div>
            <div className=' flex justify-center '>
                <SignIn />

            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login