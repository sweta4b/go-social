import { Avatar, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../Context/AuthContext';
import { useUser } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom';

function SuggestionBar() {
    const { userState, followTheUser,unfollowTheUser } = useUser();
    const { authState } = useAuth();
    const [searchUser, setSearchUser] = useState('');
    const navigate = useNavigate();

    const suggestedPeople = (userState?.filter((user) => user.username !== authState?.user?.username))


   const isFollowed = (userId) => userState?.find((user) => user._id === userId)?.followers.some((user) => user.username === authState?.user?.username) ? true : false

    return (
        <>
            <div className='suggestionnav'>
                <h2>
                    Suggestion
                </h2>
                <div className='search'>
                <SearchIcon/>
                <input
                 placeholder='search user....' onChange={(event) => setSearchUser(event.target.value)} className='searchbar'/>
                 </div>
                {
                    suggestedPeople.filter((user) => user.firstName.toLowerCase().includes(searchUser.toLowerCase()) || user.username.toLowerCase().includes(searchUser.toLowerCase())).map((user) => (
                        <div className='suggestionbar' key={user._id}>
                            <Stack>
                                <Avatar src={user.displayProfile} onClick={() => navigate(`/profile/${user.username}`)}></Avatar>
                            </Stack>
                            <div>
                                <h4>{user.firstName} {user.lastName}</h4>
                                <p>{user.username}</p>
                                {
                                    isFollowed(user?._id) ? (
                                        <Button variant='contained' size='small' sx={{ backgroundColor: '#d62b70', mt: 2, width: '100px' }} onClick={() => unfollowTheUser(user?._id)}>Unfollow</Button>
                                    ) : (
                                        <Button variant='contained' size='small' sx={{ backgroundColor: '#d62b70', mt: 2, width: '100px' }} onClick={() => followTheUser(user?._id)}>Follow</Button>
                                    )
                                }
                               
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default SuggestionBar
