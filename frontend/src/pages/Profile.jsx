import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';
import UserProfileInfo from '../components/UserProfileInfo';
import PostCard from '../components/PostCard';
import moment from 'moment';
import ProfileModal from '../components/ProfileModal';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function Profile() {

  const currentUser = useSelector((state) => state.user.value)

  const {getToken} = useAuth()
  const {profileId} = useParams();
  const [user , setUser] = useState(null)
  const [posts ,setPosts] = useState([]);
  const [activeTab , setActiveTab] = useState("posts");
  const [showEdit , setShowEdit] = useState(false)

  const fetchUser = async(profileId)=>{
    const token =  await getToken()
    console.log(token)

    try {
      const {data} = await api.post(`/api/user/profile` , {profileId} , {
        headers : {Authorization : `Bearer ${token}`}
      })
      if(data.success){
        setUser(data.profile)
        setPosts(data.posts)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(e){
      toast.error(e.message)
    }
  }
  useEffect(()=>{
    if(profileId){
      fetchUser()
    }
    else{
      fetchUser(currentUser._id)   
    }

  } , [profileId , currentUser])

  return user ?  (
    <div className='h-full relative overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* Profile card */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            { user.cover_photo && <img src={user.cover_photo} className='w-full h-full object-cover' alt='' />}
          </div>
          {/* User Info */}
          <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
        </div>
        {/* Tabs */}
        <div className='mt-6'>
          <div className='bg-white rounded-xl mx-auto max-w-md flex'>
            {["posts", "media", "likes"].map((tab) => (
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeTab === tab ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {/* Posts */}
          {activeTab === "posts" && (
            <div>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
          {/* Media */}
          {activeTab === 'media' && (
            <div className='flex flex-wrap mt-6 max-w-6xl'>
              {posts.filter((post) => post.image_urls.length > 0).map((post) => (
                <div key={post._id}>
                  {post.image_urls.map((image, index) => (
                    <Link target='_blank' to={image} key={index} className='relative group'>
                      <img src={image} className='w-64 aspect-video object-cover' alt='' />
                      <p className='absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300'>Posted {moment(post.createdAt).fromNow()}</p>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Edit Profile Model */}
      { showEdit && <ProfileModal setShowEdit={setShowEdit}/>}
    </div>
  ) : (
    <Loading />
  );
}

export default Profile
