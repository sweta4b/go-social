import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import postReducer from "../Reducer/PostReducer";
import { useAuth } from "./AuthContext";



const PostContext = createContext();



export const PostProvider = ({ children }) => {
    const { token } = useAuth();

    const initialDataState = {
        post: [],
        userpost: [],
        sortby:"latest"
    }

    const [dataState, dataDispatch] = useReducer(postReducer, initialDataState)


    const getData = async () => {
        try {
            const { data, status } = await axios({
                method: "GET",
                url: "/api/posts",
            });

            if (status === 200 || status === 201) {
               dataDispatch({ type: 'get_post', payload: data?.posts });
            }
        } catch (error) {
            toast.error(error.response.data.errors[0])
        }
    };

    const userPost = async (username) => {
        try {
            const { data, status } = await axios({
                method: "GET",
                url: `/api/posts/user/${username}`,
            });
            if (status === 200 || status === 201) {
                dataDispatch({ type: "user_post", payload: data?.posts });
                
            }
        } catch (error) {
            toast.error(error.response.data.errors[0])
        }
    }

    const postLike = async (postId) => {
        try {
            const { data, status } = await axios({
                method: 'POST',
                url: `/api/posts/like/${postId}`,
                headers: { authorization: token },
            });
            if (status === 200 || status === 201) {
                dataDispatch({ type: "get_post", payload: data?.posts })
                toast.success("Liked")
                return data.posts.find((post) => post._id === postId)
            }
        } catch (error) {
            toast.error(error.response.data.errors[0])
        }
    }


    const postDislike = async (postId) => {
        try {
            const { data, status } = await axios({
                method: 'POST',
                url: `/api/posts/dislike/${postId}`,
                headers: { authorization: token },
            });
            if (status === 200 || status === 201) {
                dataDispatch({ type: "get_post", payload: data?.posts })
                toast.success("Disliked")
            }
        } catch (error) {
            toast.error(error.response.data.errors[0])
        }
    }


    const postDelete = async (postId) => {
        try {
            const { data, status } = await axios({
                method: 'DELETE',
                url: `/api/posts/${postId}`,
                headers: { authorization: token }
            });
            if (status === 200 || status === 201) {
                dataDispatch({ type: 'get_post', payload: data?.posts })
                toast.success("Post Deleted")
            }
        } catch (error) {
            toast.error(error.response.data.errors[0])
        }
    }

    const createPost = async (newPost) => {
        try {
            const {data,status} = await axios.post(
               '/api/posts',
                 {
                   postData : newPost
                 },
               {
                  headers : {authorization: token}
               })

               if(status === 201) {
                dataDispatch({type: 'get_post', payload: data?.posts})
                toast.success("Add new post")
               }
        } catch (error) {
            toast.error(error.response.data.errors[0])
        }
    }


    const editPost = async (postId, postData) => {
        try {
            const {data, status} = await axios.post(
                `/api/posts/edit/${postId}`,
                {postData},
                {headers: {authorization: token}}
            )
            if (status === 200 || status === 201){
                dataDispatch({type:'get_post', payload: data?.posts})
                toast.success("Post edited")
            }
        } catch (error) {
            toast.error(error.response.data.errors[0])
        }
    }

    useEffect(() => {
        if (token) {
            getData();
        }
    }, [token])

    return (
        <PostContext.Provider value=
        {{ 
            dataState, 
            postDelete, 
            postDislike, 
            postLike, 
            userPost,
            createPost,
            dataDispatch,
            getData,
            editPost
        }}>
            {children}
        </PostContext.Provider>
    )
}


export const usePost = () => useContext(PostContext);