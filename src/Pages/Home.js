import React from 'react'
import Feed from '../Components/Feed'
import Filter from '../Components/Filter'
import Navbar from '../Components/Navbar'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { useAuth } from '../Context/AuthContext'
import { usePost } from '../Context/PostContext'


function Home() {
    const { dataState } = usePost()
    const { authState } = useAuth()


    let feedData=[]
    const followFeedPost = dataState?.post?.filter(({ username }) => {
        const followUsernameArr = authState?.user?.following?.map(
          ({ username }) => username
        );
        return followUsernameArr?.includes(username);
      });
    
      feedData = [
        ...feedData,
        ...followFeedPost,
        ...dataState?.post?.filter(
          ({ username }) => username === authState?.user?.username
        ),
      ];

    if(dataState?.sortby === "trending"){
       feedData = feedData?.sort((a,b) => b.likes.likeCount - a.likes.likeCount);
    }else if(dataState?.sortby === "latest"){
        feedData = feedData?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    }


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='maincontainer'>
                <SidenavBar />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexWrap: 'wrap' }}>
                    <Filter/>
                    {
                        feedData?.map((posts) => (

                            <div key={posts._id}>
                                <Feed data={posts} />
                            </div>
                        ))
                    }
                </div>
                <SuggestionBar />
            </div>
           
        </>
    )
}

export default Home
