import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
  } from "react";
  import  authReducer  from "../Reducer/AuthReducer";
  import axios from "axios";
  import { useNavigate } from "react-router";
  import { toast } from "react-toastify";
  import 'react-toastify/dist/ReactToastify.css';
  
  const AuthContext = createContext();
  
  export const AuthProvider = ({ children }) => {
    const localStorageItem = JSON.parse(localStorage.getItem("data"));

    const authInitial = {
      user: {},
    };
  
    const [token, setToken] = useState(localStorageItem?.token || "");
  
   

    const [authState, authDispatch] = useReducer(authReducer, authInitial);
    const navigate = useNavigate();
  
    const userLogin = async (loginData) => {
      try {
    
        const { data, status } = await axios({
          method: "POST",
          data: loginData,
          url: "/api/auth/login",
        });

        if (status === 200) {

          authDispatch({ type: "set_user", payload: data?.foundUser });
          setToken(data?.encodedToken);
          
          navigate("/home");

          localStorage.setItem(
            "data",
            JSON.stringify({ user: data?.foundUser, token: data?.encodedToken })
          );

          toast.success("Logged In!")
        }
      } catch (e) {
        console.log(e);
        alert(e.response.data.errors);
      }
    };
  
    const userSignup = async (signupData) => {
      try {
        
        const { data, status } = await axios({
          method: "POST",
          data: signupData,
          url: "/api/auth/signup",
        });
        if (status === 201) {
            console.log(data)
          authDispatch({ type: "set_user", payload: data?.createdUser });
          setToken(data?.encodedToken);
          localStorage.setItem(
            "data",
            JSON.stringify({ user: data?.createdUser, token: data?.encodedToken })
          );
          navigate( "/");
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    const userLogout = () => {

      authDispatch({ type: "set_user", payload: {} });
      setToken("");
      localStorage.removeItem("data");
      toast.success("Logged Out!");
    };
  
    useEffect(() => {
      if (localStorageItem) {

        authDispatch({ type: "set_user", payload: localStorageItem?.user });
        setToken(localStorageItem?.token);
    
      }
    }, []);
  
    return (
      <>
        <AuthContext.Provider
          value={{
            authState,
            userLogin,
            userSignup,
            userLogout,
            token,
            authDispatch
          }}
        >
          {children}
        </AuthContext.Provider>
      </>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);
  