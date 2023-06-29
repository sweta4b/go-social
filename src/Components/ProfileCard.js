
import { Avatar, Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useAuth } from '../Context/AuthContext'
import { useUser } from '../Context/UserContext';

function ProfileCard({userProfile, totalPost}) {

    const {authState} = useAuth();
    const {userState, unfollowTheUser, followTheUser} = useUser()

    const {_id, firstName, lastName, bio1, bio2, displayProfile, username, createdAt, followers, following } = userProfile

   const isUserLoggedIn = authState?.user?.username === username;

   const isFollowed = (userId) => userState?.find((user) => user._id === userId)?.followers.some((user) => user.username === authState?.user?.username) ? true : false

    return (
        <>
        <div className='profilecard'>

            <div className='card' >

              <div className='userinfo'>
                <Stack><Avatar src={displayProfile}></Avatar></Stack>
                <div>
                   <h3>{firstName} {lastName}</h3>
                    <p>{username}</p>
                </div>
              </div>


                <div className='btn'>
                    {
                        isUserLoggedIn ? (
                            <EditNoteIcon/>
                        ) : (

                        isFollowed(_id) ? (
                            <Button variant='contained' size='small' sx={{ backgroundColor: '#d62b70', mt: 2, width: '100px' }} onClick={() => unfollowTheUser(_id)}>Unfollow</Button>
                        ):
                            <Button variant='contained' size='small' sx={{ backgroundColor: '#d62b70', mt: 2, width: '100px' }} onClick={() => followTheUser(_id)}>Follow</Button>
                        )
                    }
                    
                </div>

            </div>

           

            <div className='bio'>
                 <p>{bio1}</p>
                 <p>{bio2}</p>
            </div>

            <div className='user-post-info'>
                <p>{totalPost} post</p>
                <p>{followers.length} followers</p>
                <p>{following.length} followings</p>
            </div>
        </div>
        </>
    )
}

export default ProfileCard
