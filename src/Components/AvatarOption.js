import { Button, Modal } from '@mui/material';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { userAvatarList } from '../backend/db/useravatarList';
import { useAuth } from '../Context/AuthContext';

function AvatarOption({avatarList, setAvatarList, setProfileData, profileData }) {

    const { authState } = useAuth();
    const [avatar, setAvatar] = useState('');

    return (
        <div>
            <Modal
            open = {avatarList}
            onClose={() => setAvatarList(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
               <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                margin:'auto',
                marginTop:'200px',
                width:'300px'
               }}>
                <div style={{
                    display:'block',
                    margin:'auto'
                }}>
                    <h1>Avatar</h1>
                </div>
                <div style={{display:'flex' , flexWrap:'wrap', justifyContent:'center'}}>
          {userAvatarList
            ?.filter((image) => image !== authState?.user?.displayProfile)
            .map((avatarimg) => (
              <div >
                <img
                  style={{
                    width:'100px',
                    borderRadius:'50px',
                    cursor:'pointer'
                  }}
                
                  src={avatarimg}
                  alt="avatar"
                  onClick={() => setAvatar(avatarimg)}
                />
              </div>
            ))}
        </div>

        <Button variant='contained' sx={{
            bgcolor:'#d62b70',
            width:'100px',
            display:'block',
            margin:'auto',
            marginTop:'10px',
            marginBottom:'10px'
        }}
          onClick={() => {
            if (avatar.length === 0) {
              toast.warning("Please select an avatar!");
            } else {
              setProfileData({ ...profileData, displayProfile: avatar });
            }
            setAvatarList(false);
          }}
        >
          Save
        </Button>
               </div>
         
            </Modal>
        </div>
    )
}

export default AvatarOption
