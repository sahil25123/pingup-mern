import Sidebar from '../components/Sidebar';
import React , {useState} from 'react'
import { Outlet } from 'react-router-dom'
import {X  , Menu} from "lucide-react"
import Loading from '../components/Loading';
import Feed from './Feed';


function Layout() {


    const [sidebarOpen , setSidebarOpen] = useState(false);
    const user  = true;


  return  user ? (
    <div className='w-full flex h-screen'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={sidebarOpen}/>

        <div className='flex-1 bg-slate-50'>
            <Outlet/>
        </div>
      { sidebarOpen ? 
        <X className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={()=>setSidebarOpen(false)}/> 
        : 
        <Menu className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={()=>setSidebarOpen(true)}/>
      }
    </div>

      
  ) : (
    <Loading/>
  )
}

export default Layout
