import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button, Modal, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { usePost } from "../Context/PostContext";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { border, margin, styled } from "@mui/system"; // Import the styled utility from @mui/system

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
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
});

const CreatePost = ({ showModal, setShowModal }) => {
  const { createPost } = usePost();
  const initialState = {
    content: "",
    imageUrl: "",
    comments:[]
  };

  const [userInput, setUserInput] = useState(initialState);
  const [image, setImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

   const handlePost = () => {
    createPost(userInput);
    setUserInput(initialState);
    setImage(null);
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Typography variant="h5" style={{
            marginTop:'10px',
            marginLeft:'10px',

        }}>New Post</Typography>
        <CloseIconContainer onClick={() => setShowModal(false)}>
          <CloseIcon />
        </CloseIconContainer>
        <div>
          <div>
            <textarea style={{
                width:'300px',
                borderRadius: '5px',
                border: '0.5px solid grey',
                margin:'auto',
                display:'block',
                padding:'5px',
                marginTop:'20px'
                
            }}
              value={userInput?.content}
              placeholder="New Post"
              onChange={(e) =>
                setUserInput({ ...userInput, content: e.target.value })
              }
            />
            {image && (
              <div style={{ margin: "auto", display: "block" }}>
               
                <CloseIcon sx={{ marginLeft:'270px'}}
                  onClick={() => {
                    setImage(null);
                    setUserInput({ ...userInput, imageUrl: "" });
                  }}
                />

                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  width="200"
                  style={{
                    margin: "auto",
                    display: "block",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{
            marginTop:'20px',
            display: 'flex',
            gap:'20px',
            flexWrap:'wrap'
        }}>
          <div>
            <label
              className="relative"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <AddReactionIcon sx={{color: 'black', marginLeft:'10px'}}/>
            </label>

            {showEmoji && (
              <div className="z-20 absolute top-[100%]" onClick={() => setShowEmoji(true)}>
                <Picker
                  data={data}
                  maxFrequentRows={0}
                  previewPosition="none"
                  emojiButtonSize={28}
                  emojiSize={20}
                  onEmojiSelect={(emoji) => {
                    setUserInput({
                      ...userInput,
                      content: userInput.content + emoji.native,
                    });
                  }}
                />
              </div>
            )}
          </div>

          <label>
            <AddPhotoAlternateIcon />
            <input
              style={{ display: "none" }}
              type="file"
              accept="/image*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setUserInput({
                  ...userInput,
                  imageUrl: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
          </label>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#d62b70",
              padding:'1px',
              marginBottom:'10px'
            }}
            onClick={handlePost}
            disabled={userInput?.content === "" && userInput?.imageUrl === ""}
          >
            Post
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default CreatePost;
