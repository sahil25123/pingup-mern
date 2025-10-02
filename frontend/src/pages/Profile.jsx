import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  const currentUser = useSelector((state) => state.user.value);
  const { getToken } = useAuth();
  const { profileId } = useParams();
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        
        // Use profileId from params, or currentUser._id if viewing own profile
        const idToFetch = profileId || currentUser?._id;
        
        if (!idToFetch) {
          setLoading(false);
          return;
        }

        const { data } = await api.post(`/api/user/profile`, 
          { profileId: idToFetch },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          setUser(data.profile);
          setPosts(data.posts || []);
        } else {
          toast.error(data.message);
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
        toast.error(e.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUser();
    }
  }, [profileId, currentUser?._id, getToken]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className='h-full flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <p className='text-gray-600'>User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full relative overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* Profile card */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/* Cover Photo */}
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 relative'>
            {user.cover_photo && (
              <img 
                src={user.cover_photo} 
                className='w-full h-full object-cover' 
                alt='Cover' 
              />
            )}
          </div>

          {/* User Info */}
          <UserProfileInfo 
            user={user} 
            posts={posts} 
            profileId={profileId} 
            setShowEdit={setShowEdit}
            currentUser={currentUser}
          />
        </div>

        {/* Tabs */}
        <div className='mt-6'>
          <div className='bg-white rounded-xl mx-auto max-w-md flex overflow-hidden shadow-sm'>
            {["posts", "media", "likes"].map((tab) => (
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab 
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                key={tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className='space-y-4 mt-6'>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              ) : (
                <div className='bg-white rounded-xl p-8 text-center shadow-sm'>
                  <p className='text-gray-500'>No posts yet</p>
                </div>
              )}
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className='mt-6'>
              {posts.filter((post) => post.image_urls?.length > 0).length > 0 ? (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  {posts
                    .filter((post) => post.image_urls?.length > 0)
                    .map((post) => (
                      <React.Fragment key={post._id}>
                        {post.image_urls.map((image, index) => (
                          <Link 
                            to={image} 
                            key={index} 
                            target='_blank'
                            className='relative group aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow'
                          >
                            <img 
                              src={image} 
                              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110' 
                              alt='' 
                            />
                            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300'>
                              <p className='absolute bottom-2 right-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity'>
                                Posted {moment(post.createdAt).fromNow()}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </React.Fragment>
                    ))}
                </div>
              ) : (
                <div className='bg-white rounded-xl p-8 text-center shadow-sm'>
                  <p className='text-gray-500'>No media posts yet</p>
                </div>
              )}
            </div>
          )}

          {/* Likes Tab */}
          {activeTab === 'likes' && (
            <div className='space-y-4 mt-6'>
              {posts.filter((post) => post.likes?.length > 0).length > 0 ? (
                posts
                  .filter((post) => post.likes?.length > 0)
                  .map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
              ) : (
                <div className='bg-white rounded-xl p-8 text-center shadow-sm'>
                  <p className='text-gray-500'>No liked posts yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && <ProfileModal setShowEdit={setShowEdit} user={user} />}
    </div>
  );
}

export default Profile;