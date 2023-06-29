import React from 'react'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { useBookmark } from '../Context/BookmarkContext'
import { usePost } from '../Context/PostContext'

function BookMark() {

    const {bookmarkState} = useBookmark();
    const{dataState} = usePost();

    return (
        <>
        <div>
            <Navbar/>
        </div>
        <div className='maincontainer'>
            <SidenavBar/>
            {bookmarkState?.bookmark?.length === 0 ? <h1>No bookmark added</h1> : 
            <div>
             { bookmarkState?.bookmark?.map(({_id : postId}) => (
                <div key={postId} >
                <Feed data={dataState?.post?.find((post) => post._id === postId)}/>
                </div>
            ))}
            </div>
            }
            <SuggestionBar/>
        </div>
        </>
    )
}

export default BookMark
