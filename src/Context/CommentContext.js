import axios from "axios";
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { usePost } from "./PostContext";




const CommentContext = createContext();

export const CommentProvider = ({children}) => {
    const {token} = useAuth();
    const {dataDispatch} = usePost()


    const addComment = async (postId, comment) => {
        console.log(postId, comment)
        try {
            const {data,status} = await axios.post(
                `/api/comments/add/${postId}`,
                {
                    commentData : comment
                },
                {
                    headers: {authorization: token}
                })
                if(status === 200 || status ===201){
                    dataDispatch({type:'get_post', payload: data?.posts})
                }
                
        } catch (error) {
            console.log(error)
        }
    }


    const editComment = async (postId, commentId, comment) => {
        try {
            const {data,status} = await axios.post(
                `/api/comments/edit/${postId}/${commentId}`,
                {
                    commentData : comment
                },
                {
                    headers: {authorization: token}
                })
                if(status === 200 || status ===201){
                    dataDispatch({type:'get_post', payload: data?.posts})
                }
                
        } catch (error) {
            console.log(error)
        }
    }


    const deleteComment = async (postId, commentId) => {
        try {
            const {data, status} = await axios({
                method:'POST',
                url: `/api/comments/delete/${postId}/${commentId}`,
                headers: {authorization:token}
            })
            if(status === 200 || status === 201){
                dataDispatch({type:'get_post', payload: data?.posts})
            }
        } catch (error) {
           console.log(error) 
        }
    }


    return(
        <CommentContext.Provider
        value={{addComment, editComment, deleteComment}}
        >
            {children}
        </CommentContext.Provider>
    )

}

export const useComment = () => useContext(CommentContext)