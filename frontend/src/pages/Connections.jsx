import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyConnectionsData as connections , 
  dummyFollowersData as followers , 
  dummyFollowingData as follwings , 
  dummyPendingConnectionsData as pendingConnections
 } from '../assets/assets'
 import { MessageSquare, User, UserCheck, UserPlus, UserRoundPen } from 'lucide-react';

function Connections() {

  const [currentTab, setCurrentTab] = useState('Followers');

  const navigate  = useNavigate();

  const dataArray = [
    {label : "followers" , value : followers , icon: User} ,
    { label :"followings" , value : follwings , icon :UserCheck},
    { label : "Pending" , value : pendingConnections , icon:UserRoundPen },
    {label:"Connections" , value :connections , icon :UserPlus}
  ]
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* Title */}
        <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
        <p className='text-slate-600'>Manage your network and discover new connections</p>
        </div>

         {/* Counts */}
        <div className='mb-8 flex flex-wrap gap-6'>
          { dataArray.map((item, index) => (
            <div key={index} className='flex flex-col items-center justify-center gap-1 border h-20 w-40 border-gray-200 bg-white shadow rounded-md'>
              <b>{item.value.length}</b>
              <p className='text-slate-600'>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className='inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm'>
          {
            dataArray.map((tab) => (
              <button onClick={()=>setCurrentTab(tab.label)} key={tab.label} className={`cursor-pointer flex items-center px-3 py-1 text-sm rounded-md transition-colors ${currentTab === tab.label ? "bg-white font-medium text-black" : "text-gray-500 hover:text-black"}`}>
                <tab.icon className='size-4'/>
                <span className='ml-1'>{tab.label}</span>
                { tab.count !== undefined && (
                  <span className='ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full'>{tab.count}</span>
                )}
              </button>
            ))
          }
        </div>
        {/* connections */}
        <div className='flex flex-wrap mt-6 gap-6'>
          {dataArray.find((item)=>item.label === currentTab).value.map((user)=>(
            <div key={user._id}>


            </div>
          ))}
        </div>


      </div>

      
    </div>
  )
}

export default Connections
