import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regularBookmark, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Menu, MenuItem, Stack } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { usePost } from '../Context/PostContext';
import { useBookmark } from '../Context/BookmarkContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { useComment } from '../Context/CommentContext';
import EditPost from './EditPost';
import { useTheme } from '../Context/ThemeContext';



function Feed({ data, userData }) {

    const { _id, content, likes, username, createdAt, imageUrl, comments } = data

    const { authState } = useAuth();
    const { userState } = useUser();
    const { themeType } = useTheme()
    const navigate = useNavigate();
    const { addComment, deleteComment } = useComment();
    const [user, setUser] = useState({})
    const { postDislike, postLike, postDelete, getData } = usePost();
    const { bookmarkState, removePostFromBookmark, addPostToBookmark } = useBookmark();
    const [display, setDisplay] = useState(false);
    const [commentText, setCommentText] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setUser(userState.find((user) => user.username === username))
    }, [username, userState])

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
            <div className='feed' style={{ boxShadow: themeType && '2px 2px 10px 1px #2e2e2e' }}>
                {
                    showEditForm && (
                        <EditPost
                            data={data}
                            setShowEditForm={setShowEditForm}
                            showEditForm={showEditForm}
                        />
                    )
                }
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="postInfo">
                        <Stack onClick={() => navigate(`/profile/${username}`)}>
                            <Avatar src={user?.displayProfile ?? userData?.displayProfile} alt="" />
                        </Stack>
                        <div>
                            <h3>{username}</h3>{" "}
                            <p style={{ fontSize: '10px' }}>{createdAt}</p>
                        </div>
                    </div>
                    {authState?.user?.username === username && (
                        <MoreVertIcon aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick} />
                    )}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { setShowEditForm(true); setAnchorEl(null) }}>Edit</MenuItem>
                        <MenuItem onClick={() => postDelete(_id)}>Delete</MenuItem>
                    </Menu>
                </div>
                <div className="postContent">
                    {imageUrl && <img src={imageUrl} alt="images" className="displayimg" />}
                    <p className='content'>{content}</p>
                    <span style={{ fontSize: "12px" }}>
                        {likes.likeCount} Likes
                    </span>
                    <span style={{ fontSize: "12px", marginLeft: '10px' }}>
                        {comments.length} Comments
                    </span>
                </div>
                <div className="iconbtn"  >
                    <div onClick={handlePostLikes}>
                        {isPostLiked ? (
                            <span>
                                <FontAwesomeIcon
                                    icon={solidHeart}
                                    style={{ color: '#d62b70' }}
                                />
                                {" "}
                            </span>
                        ) : (
                            <span>
                                <FontAwesomeIcon
                                    icon={regularHeart}
                                />
                                {" "}
                            </span>
                        )}
                    </div>

                    <div onClick={() => setDisplay(!display)}>
                        <span>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                    </div>

                    <div onClick={handleBookmarkedPost}>
                        {
                            isPostBookmarked ? (
                                <span>
                                    <FontAwesomeIcon icon={solidBookmark}
                                        style={{ color: '#d62b70' }} />
                                </span>
                            ) : (
                                <span>
                                    <FontAwesomeIcon icon={regularBookmark} />
                                </span>
                            )
                        }
                    </div>
                </div>
                <div style={{ display: display ? 'block' : 'none' }}>
                    <div style={{
                        display: 'flex',
                        marginTop: '10px',
                        gap: '5px'
                    }}>
                        <input
                            value={commentText}
                            onChange={(event) => setCommentText(event.target.value)}
                            placeholder='Add Comment'
                            style={{
                                width: '80%',
                                borderRadius: '5px',
                                border: '0.5px solid grey'

                            }}
                        />
                        <Button variant='contained' size='small' sx={{ bgcolor: '#d62b70' }} onClick={() => { addComment(_id, commentText); setCommentText('') }}>Comment</Button>
                    </div>
                    {
                        comments?.length > 0 ? (
                            <div>
                                {comments?.map((comment) => {
                                    const commentUser = userState?.find((user) => user?.username === comment?.username)

                                    return (
                                        <div style={{ border: '0.5px solid grey', marginTop: '10px', borderRadius: '5px' }} key={comment.text}>
                                            <div onClick={() => { getData(commentUser?.username); navigate(`/profile/${commentUser?.username}`) }} style={{ display: 'flex', gap: '10px', padding: '10px' }}>
                                                <Stack>
                                                    <Avatar src={commentUser ? commentUser.displayProfile : comment.displayProfile}></Avatar>
                                                </Stack>
                                                <div>
                                                    <h4>{comment?.firstName} {comment?.lastName}</h4>
                                                    <p>@{comment?.username}</p>

                                                </div>
                                            </div>
                                            <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                                <p>{comment.text}</p>
                                                {
                                                    authState?.user?.username === comment.username && (
                                                        <div>
                                                            <DeleteIcon onClick={() => deleteComment(_id, comment?._id)} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                )}

                            </div>
                        ) : null

                    }
                </div>
            </div>
        </>
    )
}

export default Feed
