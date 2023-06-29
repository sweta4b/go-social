import React from 'react'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { useAuth } from '../Context/AuthContext'
import { usePost } from '../Context/PostContext'
import { useUser } from '../Context/UserContext'

function Home() {
    const { dataState } = usePost()
    const { authState } = useAuth()
    const { userState } = useUser();

    const feedData = [...dataState?.post?.filter((post) => post.username === authState?.user?.username), ...dataState?.post?.filter(({ username }) => userState?.find((user) => user.username === authState?.user?.username)?.following?.map(({ username }) => username).includes(username))]

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='maincontainer'>
                <SidenavBar />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexWrap: 'wrap' }}>
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
