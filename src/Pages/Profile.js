import { Avatar, Button, Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EditProfile from '../Components/EditProfile'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import SidenavBar from '../Components/SidenavBar'
import SuggestionBar from '../Components/SuggestionBar'
import { useAuth } from '../Context/AuthContext'
import { usePost } from '../Context/PostContext'
import { useUser } from '../Context/UserContext'
import EditNoteIcon from '@mui/icons-material/EditNote';


function Profile() {
    const { dataState, userPost } = usePost()
    const { userState, unfollowTheUser, followTheUser } = useUser();
    const { authState } = useAuth();
    const { username } = useParams();
    const [showProfileForm, setShowProfileForm] = useState(false)
    const [userData, setUserData] = useState({})

    const isUserLoggedIn = authState?.user?.username === username;

    const isFollowed = (userId) => userState?.find((user) => user._id === userId)?.followers.some((user) => user.username === authState?.user?.username) ? true : false


    const getUserDetails = async () => {
        try {

            const { data, status } = await axios({
                method: "GET",
                url: `/api/users/${username}`,
            });
            console.log(data)
            if (status === 200 || status === 201) {
                setUserData(data?.user);
                userPost(username);

            }
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        console.log('rendering')
        getUserDetails();

    }, [username, userState, dataState?.post]);


    const postNumber = dataState?.userpost.map((post) => post).length;

    return (

        <>
            <div>
                <Navbar />
            </div>
            <div className='maincontainer'>
                <SidenavBar />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexWrap: 'wrap' }}>

                    <EditProfile user={userData}
                        showProfileForm={showProfileForm}
                        setShowProfileForm={setShowProfileForm}
                    />

                    <div className='profilecard'>
                        <div className='card' >
                            <div className='userinfo'>
                                <Stack><Avatar src={userData?.displayProfile}></Avatar></Stack>
                                <div>
                                    <h3>{userData?.firstName} {userData?.lastName}</h3>
                                    <p>{userData?.username}</p>
                                </div>
                            </div>
                            <div className='btn'>
                                {
                                    isUserLoggedIn ? (
                                        <EditNoteIcon onClick={() => setShowProfileForm(true)} />
                                    ) : (

                                        isFollowed(userData?._id) ? (
                                            <Button variant='contained' size='small' sx={{ backgroundColor: '#d62b70', mt: 2, width: '100px' }} onClick={() => unfollowTheUser(userData?._id)}>Unfollow</Button>
                                        ) :
                                            <Button variant='contained' size='small' sx={{ backgroundColor: '#d62b70', mt: 2, width: '100px' }} onClick={() => followTheUser(userData?._id)}>Follow</Button>
                                    )
                                }

                            </div>
                        </div>
                        <div className='bio'>
                            <p>{userData?.bio}</p>
                            <p>{userData?.portfolioUrl}</p>
                        </div>
                        <div className='user-post-info'>
                            <p>{postNumber} post</p>
                            <p>{userData?.followers?.length} followers</p>
                            <p>{userData?.following?.length} followings</p>
                        </div>
                    </div>

                    {
                        dataState?.userpost?.map((posts) => (
                            <div key={posts._id}>
                                <Feed data={posts} userData={userData}/>
                            </div>
                        ))
                    }
                </div>
                <SuggestionBar />
            </div>
        </>
    )
}

export default Profile
