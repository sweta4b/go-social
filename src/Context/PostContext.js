import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import postReducer from "../Reducer/PostReducer";
import { useAuth } from "./AuthContext";



const PostContext = createContext();



export const PostProvider = ({ children }) => {
    const { token } = useAuth();

    const initialDataState = {
        post: [],
        userpost: [],
    }

    const [dataState, dataDispatch] = useReducer(postReducer, initialDataState)

    // console.log(dataState)


    const getData = async () => {
        try {
            const { data, status } = await axios({
                method: "GET",
                url: "/api/posts",
            });

            if (status === 200 || status === 201) {
               dataDispatch({ type: 'get_post', payload: data?.posts });
            }
        } catch (e) {
            console.log(e);
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
        } catch (e) {
            console.log(e)
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
                return data.posts.find((post) => post._id === postId)
            }
        } catch (error) {

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
            }
        } catch (error) {

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
            }
        } catch (error) {

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
               }
        } catch (error) {
            console.log(error)
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
            dataDispatch
        }}>
            {children}
        </PostContext.Provider>
    )
}


export const usePost = () => useContext(PostContext);