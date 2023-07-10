import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useUser } from '../Context/UserContext';
import AvatarOption from './AvatarOption';



const Container = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 340,
    backgroundColor: "white",
    boxShadow: 24,
    p: 2,
    borderRadius: "5px",
});

function EditProfile({ user, showProfileForm, setShowProfileForm }) {
    const { editUser } = useUser();
    const [avatarList, setAvatarList] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        displayProfile: '',
        bio: '',
        portfolioUrl: '',
      });
    
      useEffect(() => {
        if (user) {
          setProfileData({
            firstName: user.firstName,
            lastName: user.lastName,
            displayProfile: user.displayProfile,
            bio: user.bio,
            portfolioUrl: user.portfolioUrl,
          });
        }
      }, [user]);

   

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfileData((profileData) => ({ ...profileData, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        editUser(profileData);
        setShowProfileForm(false)
    }

    return (
        <div>
            {
                avatarList && (
                    <AvatarOption
                    setProfileData={setProfileData}
                    setAvatarList={setAvatarList}
                    avatarList={avatarList}
                    />
                )
            }
            <Modal
                open={showProfileForm}
                onClose={() => setShowProfileForm(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Container>
                    <h1 style={{color:'black', textAlign:'center'}}>Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <img src={profileData?.displayProfile} alt=""  style={{
                                        width:'100px',
                                        height:'100px',
                                        borderRadius:'50px',
                                        display:'block',
                                        margin:'auto'
                                    }} />
                        <div style={{
                            marginTop:'10px',
                            marginLeft:'10px',
                            display:'flex',
                            justifyContent:'space-around'
                        }}>
                            <Button onClick={(event) => { event.preventDefault(); setAvatarList(true) }} variant="contained" size='small'>Select Avatar</Button>
                            <label  className='label'>
                            <p style={{marginTop:'5px'}}>Select Photo</p>
                                <input
                                    style={{display:'none'}}
                                    className="hidden"
                                    type="file"
                                    accept="/image*"
                                    onChange={(e) => {
                                        setProfileData((profileData) => ({ 
                                            ...profileData,
                                            displayProfile: URL.createObjectURL(e.target.files[0]),
                                        }));
                                    }}
                                />
                               
                                </label>
                        </div>

                        <div style={{
                            display:'flex',
                            justifyContent:'center',
                            gap:'20px',
                            marginTop:'20px',
                            marginBottom:'20px',
                        }}>
                            <div>
                                <input placeholder='firstName'
                                    value={profileData?.firstName}
                                    name="firstName"
                                    onChange={ handleChange}
                                />

                            </div>
                            <div >
                                <input placeholder='lastName'
                                    value={profileData?.lastName}
                                    name="lastName"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            gap:'20px'
                        }}>
                            <div>
                            <textarea
                                placeholder='Bio'
                                value={profileData?.bio}
                                name="bio"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <input placeholder='portfolio url'
                                value={profileData?.portfolioUrl}
                                name="portfolioUrl"
                                onChange={ handleChange}
                            />
                        </div>
                        </div>

                        <div style={{
                            display:'flex',
                            justifyContent:'center',
                            gap:'20px',
                            marginTop:'20px',
                            marginBottom:'20px',

                        }}>
                            <input type="submit" value="Save" style={{borderRadius:'5px'}}/>
                            <Button onClick={() => setShowProfileForm(false)} variant='contained' size='small'>Discard</Button>
                        </div>
                    </form>
                </Container>

            </Modal>
        </div>
    )
}

export default EditProfile
