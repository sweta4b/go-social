import React from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import ProfileCard from '../Components/ProfileCard'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { usePost } from '../Context/PostContext'
import { useUser } from '../Context/UserContext'

function Profile() {
    const {dataState} = usePost()
    const {userState} = useUser();
    const {username} = useParams();

    const filteredPost = dataState?.post?.filter((posts) => posts.username === username);

   const postNumber = filteredPost.length;

    const filteredUser = userState?.filter((users) => users.username === username)
    console.log(filteredUser)
   

    return (
       
        <>
        <Navbar/>
        <div className='maincontainer'>
          <SidenavBar/>
          <div style={{display:'flex', flexDirection:'column', gap:'5px', flexWrap:'wrap'}}>
            {
                filteredUser.map((user) => (
                    <div key={user._id}>
                    <ProfileCard userProfile={user} totalPost={postNumber}/>
                    </div>
                ))
            }
            
          {
           filteredPost?.map((posts) => (
               <div key={posts._id}>
               <Feed data={posts}/>
               </div>
           ))
          }
          </div>
       <SuggestionBar/>
       </div>
       </>
    )
}

export default Profile
