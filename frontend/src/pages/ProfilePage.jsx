import React from 'react'
import EditProfile from '../components/profile/EditProfile'
import { useSelector } from 'react-redux'
import ProfileView from '../components/profile/ProfileView'
const ProfilePage = () => {
    const userInfo = useSelector(store => store.user.userInfo)
  return (
    <div className='flex justify-center items-center gap-12 m-4 '>
        <EditProfile user={userInfo}/>

        <div>
         
        <ProfileView user={userInfo}/>
        </div>
    </div>
  )
}

export default ProfilePage