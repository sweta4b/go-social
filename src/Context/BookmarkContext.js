import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import bookmarkReducer from "../Reducer/BookmarkReducer";
import { useAuth } from "./AuthContext";



 const BookmarkContext = createContext();


export const BookmarkProvider = ({children}) => {
    const {token} = useAuth();

    const initialBookmarkState = {
        bookmark: []
    }

    const [bookmarkState, dispatchBookmark] = useReducer(bookmarkReducer, initialBookmarkState);


    const getBookmarkedPost = async () => {
        try {
            const {data, status} = await axios({
                method:"GET",
                url:"/api/users/bookmark",
                headers: {authorization: token}
            })
            if(status === 200 || status===201){
                dispatchBookmark({tyoe:'set_bookmark', payload: data?.bookmarks})
            }
        } catch (error) {
            console.log(error)
        }
    }


    const addPostToBookmark = async (postId) => {
        try {
            const {data,status} = await axios ({
                method:"POST",
                url:`/api/users/bookmark/${postId}`,
                headers: {authorization: token}
            })
            if(status === 200 || status === 201){
                dispatchBookmark({type:'set_bookmark', payload: data?.bookmarks})
            }
        } catch (error) {
            console.log(error)
        }
    }


    const removePostFromBookmark = async (postId) => {
        try {
            const {data, status} = await axios ({
                method:'POST',
                url:`/api/users/remove-bookmark/${postId}`,
                headers: {authorization: token}
            })
            if(status === 200 || status === 201){
                dispatchBookmark({type: 'set_bookmark', payload: data?.bookmarks})
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() => {
        if(token){
            getBookmarkedPost()
        }
    },[token])


    return (
        <BookmarkContext.Provider
        value={{
            removePostFromBookmark,
            addPostToBookmark,
            bookmarkState
        }}
        >
            {children}
        </BookmarkContext.Provider>
    )
}


export const useBookmark = () => useContext(BookmarkContext)