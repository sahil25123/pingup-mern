import React from 'react'
import { assets } from '../assets/assets.js'



function Login() {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <img src={assets.bgImage} className='absolute top-0 left-0 -z-1 w-full h-full object-cover' ></img>
        {/* left side  */}
        <div className='flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40'>
          <img src={assets.logo} className='h-12 object-contain' alt="" />
          <div>
            <div>
              <img src={assets.group_users} className='h-8 md:h-10' alt="" />
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default Login
