import React from 'react'
import Feed from '../Components/Feed'
import Filter from '../Components/Filter'
import Navbar from '../Components/Navbar'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { usePost } from '../Context/PostContext'

function Explore() {

    const {dataState} = usePost();

    if(dataState?.sortby === "trending"){
        dataState?.post?.sort((a,b) => b.likes.likeCount - a.likes.likeCount);
    }else if(dataState?.sortby === "latest"){
        dataState?.post?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
     
    return (
        <>
         <Navbar/>
         <div className='maincontainer'>
           <SidenavBar/>
           
           <div style={{display:'flex', flexDirection:'column', gap:'5px', flexWrap: 'wrap'}}>
           <Filter/>
           {
            dataState?.post?.map((posts) => (
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

export default Explore
