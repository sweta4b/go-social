import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regularBookmark, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Stack } from "@mui/material";
import React from 'react'
import { useAuth } from '../Context/AuthContext';
import { usePost } from '../Context/PostContext';
import { useBookmark } from '../Context/BookmarkContext';
import {  useNavigate } from 'react-router-dom';



function Feed({ data }) {
    const { _id, content, likes, username, createdAt, imageUrl } = data
    const { authState } = useAuth();
    const navigate = useNavigate();
    const { postDislike, postLike } = usePost();
    const { bookmarkState, removePostFromBookmark, addPostToBookmark } = useBookmark();

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
                        <Avatar src={imageUrl} alt="" />
                        {/* </Link> */}
                    </Stack>
                    <div>
                        <h3>{username}</h3>{" "}
                        <p style={{ fontSize: '10px' }}>{createdAt}</p>
                    </div>
                </div>

                <div className="postContent">
                    {/* {imageUrl && <img src={imageUrl} alt="images" className="displayimg" />} */}
                    <p className='content'>{content}</p>
                    <span style={{ fontSize: "12px" }}>
                        {likes.likeCount} Likes
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

                    <div>
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
