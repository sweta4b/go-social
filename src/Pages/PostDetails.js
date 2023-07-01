import { Avatar, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { useAuth } from '../Context/AuthContext'
import { useComment } from '../Context/CommentContext'
import { usePost } from '../Context/PostContext'
import { useUser } from '../Context/UserContext'

function PostDetails() {
    const {postId} = useParams();
    const navigate = useNavigate();
    const {dataState, getData} = usePost();
    const {authState} = useAuth();
    const {userState} = useUser();
    const [commentText, setCommentText] = useState('')
    const {addComment, deleteComment} = useComment();
    const [singlePost, setSinglePost] = useState({});

    const getSinglePostDetails = async () => {
        try {
            const {data, status} = await axios({
                method:'GET',
                url: `/api/posts/${postId}`
            })
            if(status === 200 || status === 201){
                setSinglePost(data?.post)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSinglePostDetails();   
    },[dataState?.post]
    );

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='maincontainer'>
                <SidenavBar />
                <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexWrap: 'wrap' }}>
                  
                        <Feed data={dataState?.post?.find(({_id}) => _id === postId)}/>
                   
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
                   
                {
                    singlePost?.comments?.length > 0 ? (
                        <div> 
                            {singlePost?.comments?.map((comment) => {
                                const commentUser = userState?.find((user) => user?.username === comment?.username)
                                return (
                                    <div style={{border:'0.5px solid grey', marginTop:'10px', borderRadius:'5px'}}>
                                        <div onClick={() => {getData(commentUser?.username); navigate(`/profile/${commentUser?.username}`)}} style={{display:'flex', gap:'10px', padding:'10px'}}>
                                    <Stack>
                                  <Avatar src={commentUser.displayProfile}></Avatar>
                                 </Stack>
                                 <div>
                                    <h4>{commentUser?.firstName} {commentUser?.lastName}</h4>
                                    <p>@{commentUser?.username}</p>
                                    
                                 </div>
                                 </div>
                                 <div style={{padding:'10px', display:'flex',justifyContent:'space-between'}}>
                                 <p>{comment.text}</p>
                                 {
                                    authState?.user?.username === commentUser?.username && (
                                          <div>
                                               <EditIcon/>
                                               <DeleteIcon onClick={() =>  deleteComment(singlePost?._id, comment?._id)}/>
                                          </div>
                                    )
                                 }
                                 </div>
                                 </div>
                                )
                            }   
                            )}
                           
                        </div>
                    ) : (
                        <h1>No comments</h1>
                    )
                }

                </div>
                

                <SuggestionBar />
            </div>
        </>
    )
}

export default PostDetails
