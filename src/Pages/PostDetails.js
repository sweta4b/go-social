import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { useComment } from '../Context/CommentContext'
import { usePost } from '../Context/PostContext'

function PostDetails() {
    const {postId} = useParams();
    const {dataState} = usePost();
    const [commentText, setCommentText] = useState('')
    const {addComment, deleteComment} = useComment();


    const singlePost = dataState?.post?.filter(({_id}) => _id === postId)

    // console.log(singlePost)


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='maincontainer'>
                <SidenavBar />
                <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexWrap: 'wrap' }}>
                  {
                    singlePost.map((post) => (
                        <Feed data={post}/>
                    ))
                  }
                </div>
                <div style={{
                    display:'flex',
                    marginTop:'10px',
                    gap:'5px'
                }}>
                    <input
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder='Add Comment' 
                    style={{
                        width:'80%',
                        borderRadius:'5px',
                        border:'0.5px solid grey'
                    }}
                    />
                    <Button variant='contained' size='small' sx={{bgcolor: '#d62b70'}} onClick={() => {addComment(postId, commentText); setCommentText('')}}>Comment</Button>
                </div>
                </div>
              

                <SuggestionBar />
            </div>
        </>
    )
}

export default PostDetails
