import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets';
import Loading from '../components/Loading';
import StoryBar from '../components/StoryBar';

function Feed() {

  const [feeds , setFeeds] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchFeeds =  async()=>{
    setFeeds(dummyPostsData)
    setLoading(false)
  }
  useEffect(()=>{ 
    fetchFeeds()
  } ,[])

  return !loading?   (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* {Storied and the post list} */}
      <StoryBar/>



      {/* Right sidebar */}
      <div className='max-xl:hidden sticky top-0'>
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
          <img src={assets.sponsored_img} alt="" className='w-75 h-50 rounded-md' />
          <p className='text-slate-600'>Email marketing</p>
          <p className='text-slate-400'>Supercharge your marketing with a powerful, easy-to-use platform built for results.</p>
        </div>
      </div>
    </div>


  ) :<Loading/>
}

export default Feed
