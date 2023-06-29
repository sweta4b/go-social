import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import userReducer from "../Reducer/UserReducer";
import { useAuth } from "./AuthContext";

const UserContext = createContext();


export const UserProvider = ({children}) => {
    const {token} = useAuth();
    const [userState, userDispatch] = useReducer(userReducer, [])


    const userData = async () => {
        try {
            const {data,status} = await axios({
                method: 'GET',
                url: "/api/users"
            })
           
            if (status === 200 || status === 201) {
               userDispatch({type: "get_user", payload: data?.users})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const followTheUser = async (userId) => {
        try {
            const {data, status} = await axios ({
                method:"POST",
                url:`/api/users/follow/${userId}`,
                headers: {authorization: token}
            })
            if(status === 200 || status === 201){
                userDispatch({type:'update_user',payload: data?.followUser});
                userDispatch({type:'update_user', payload: data?.user})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unfollowTheUser = async (userId) => {
        try {
            const {data, status} = await axios({
                method: 'POST',
                url:`/api/users/unfollow/${userId}`,
                headers: {authorization: token}
            })
            if(status === 200 || status === 201){
                userDispatch({type: 'update_user', payload: data?.followUser});
                userDispatch({type:'update_user', payload: data?.user})
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userData()
    },[]);

    return (
        <UserContext.Provider
        value={{
            unfollowTheUser,
            followTheUser,
            userState
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)