import { Button, Modal } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from 'react'
import { usePost } from '../Context/PostContext';
import styled from '@emotion/styled';




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
  
  const CloseIconContainer = styled("div")({
    marginTop:'10px',
    marginLeft:'300px',
    cursor: "pointer",
    color: 'black'
  });

function EditPost({data, showEditForm, setShowEditForm }) {
    const {editPost} = usePost();
    const [editedPost, setEditedPost] = useState({
        _id: data?._id,
        content: data?.content,
        imageUrl: data?.imageUrl
    })

    const editCurrentPost = () => {
        editPost(editedPost?._id, editedPost)
        setShowEditForm(false)
    }

   


    return (
        <>
          <Modal
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Container>
          <div>
            <h1 style={{
                textAlign:'center',
                marginTop:'10px',
                color:'black'
            }}>Edit Post</h1>
             {
                editedPost?.content && (
                    <textarea
                    style={{
                        width:'300px',
                        borderRadius: '5px',
                        border: '0.5px solid grey',
                        margin:'auto',
                        display:'block',
                        padding:'5px',
                        marginTop:'20px'
                        
                    }}
                    cols={30}
                    rows={10}
                    value={editedPost?.content}
                    onChange={(event) => setEditedPost({...editedPost, content: event.target.value})}
                   ></textarea>
                )
             }
             {
                editedPost?.imageUrl && (
                    <div>
                        <CloseIconContainer>
                       <CloseIcon onClick={() => setEditedPost({...editedPost, imageUrl:""})}/>
                       </CloseIconContainer>
                       <img
                       style={{
                        width:'300px',
                        borderRadius: '5px',
                        border: '0.5px solid grey',
                        margin:'auto',
                        display:'block',
                        padding:'5px',
                        marginTop:'20px'
                       }}
                       src={editedPost?.imageUrl}
                       alt=""
                       width='200'
                       ></img>
                    </div>
                )
             }
             <Button onClick={() => editCurrentPost()} variant="contained"
            size="small"
            sx={{
              backgroundColor: "#d62b70",
              padding:'1px',
              marginBottom:'10px',
              marginLeft:'20px',
              marginTop:'10px',
            }}>Save</Button>
             <Button onClick={() => setShowEditForm(false)} variant="contained"
            size="small"
            sx={{
              backgroundColor: "#d62b70",
              padding:'1px',
              marginBottom:'10px',
              marginLeft:'10px',
              marginTop:'10px',
            }}>Discard</Button>
          </div>
          </Container>
          </Modal>
        </>
    )
}

export default EditPost
