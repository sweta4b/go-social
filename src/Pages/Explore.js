import React from 'react'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { usePost } from '../Context/PostContext'

function Explore() {

    const {dataState} = usePost();
     
    return (
        <>
         <Navbar/>
         <div className='maincontainer'>
           <SidenavBar/>
           <div style={{display:'flex', flexDirection:'column', gap:'5px', flexWrap: 'wrap'}}>
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
