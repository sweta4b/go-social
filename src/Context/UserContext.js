import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import userReducer from "../Reducer/UserReducer";
import { useAuth } from "./AuthContext";

const UserContext = createContext();


export const UserProvider = ({children}) => {
    const {token, authDispatch} = useAuth();
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
            toast.error(error.response.data.errors[0]);
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
                console.log(data)
                userDispatch({type:'update_user',payload: data?.followUser});
                userDispatch({type:'update_user', payload: data?.user});
                authDispatch({type:'set_user', payload:data?.user})
                toast.success("Followed")
            }
        } catch (error) {
            toast.error(error.response.data.errors[0]);
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
                authDispatch({type:'set_user', payload:data?.user})
                toast.success("Unfollowed")
            }
        } catch (error) {
            toast.error(error.response.data.errors[0]);
        }
    }

    const editUser = async (userData) => {
        try {
            const { data, status } = await axios.post(
                "/api/users/edit",
                { userData },
                { headers: { authorization: token } }
              );
              if (status === 201) {
                userDispatch({ type: "update_user", payload: data?.user });
                authDispatch({ type: "set_user", payload: data?.user });
                toast.success("Profile edited")
              }
        } catch (error) {
            toast.error(error.response.data.errors[0]);
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
            userState,
            editUser,
            userDispatch
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)