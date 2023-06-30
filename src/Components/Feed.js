import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regularBookmark, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Stack } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { usePost } from '../Context/PostContext';
import { useBookmark } from '../Context/BookmarkContext';
import {  useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';



function Feed({ data }) {
    const { _id, content, likes, username, createdAt, imageUrl, comments } = data
    const { authState } = useAuth();
    const {userState} = useUser();
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const { postDislike, postLike } = usePost();
    const { bookmarkState, removePostFromBookmark, addPostToBookmark } = useBookmark();


    useEffect(() => {
        setUser(userState.find((user) => user.username === username))
    },[username, userState])

    const isPostLiked =
        data.likes?.likedBy?.filter(({ username }) => username === authState?.user?.username)
            ?.length !== 0
            ? true
            : false;


    const isPostBookmarked = bookmarkState?.bookmark?.filter(({ _id: postID }) => postID === _id)?.length !== 0 ? true : false


    const handlePostLikes = () => {
        isPostLiked ? postDislike(_id) : postLike(_id)
    }

    const handleBookmarkedPost = () => {
        isPostBookmarked ? removePostFromBookmark(_id) : addPostToBookmark(_id)
    }


    

    return (
        <>
            <div className='feed'>
                <div className="postInfo">
                    <Stack onClick={() => navigate(`/profile/${username}`)}>
                    {/* <Link to={`/profile/${_id}`}> */}
                        <Avatar src={user.displayProfile} alt="" />
                        {/* </Link> */}
                    </Stack>
                    <div>
                        <h3>{username}</h3>{" "}
                        <p style={{ fontSize: '10px' }}>{createdAt}</p>
                    </div>
                </div>

                <div className="postContent">
                    {imageUrl && <img src={imageUrl} alt="images" className="displayimg" />}
                    <p className='content'>{content}</p>
                    <span style={{ fontSize: "12px" }}>
                        {likes.likeCount} Likes
                    </span>
                    <span style={{ fontSize: "12px", marginLeft:'10px' }}>
                        {comments.length} Comments
                    </span>
                </div>

                <div className="iconbtn"  >
                    <div onClick={handlePostLikes}>
                        {isPostLiked ? (
                            <span>
                                <FontAwesomeIcon
                                    icon={solidHeart}
                                    style={{ color: 'red' }}
                                />
                                {" "}
                            </span>
                        ) : (
                            <span>
                                <FontAwesomeIcon
                                    icon={regularHeart}
                                    style={{ color: 'black' }}
                                />
                                {" "}
                            </span>
                        )}
                    </div>

                    <div onClick={() => navigate(`/post/${_id}`)}>
                        <span>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                    </div>

                    <div onClick={handleBookmarkedPost}>
                        {
                            isPostBookmarked ? (
                                <span>
                                    <FontAwesomeIcon icon={solidBookmark}
                                        style={{ color: 'black' }} />
                                </span>
                            ) : (
                                <span>
                                    <FontAwesomeIcon icon={regularBookmark} />
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed
