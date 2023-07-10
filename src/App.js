import './App.css';
import Login from './Pages/Login';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Home from "./Pages/Home"
import Explore from './Pages/Explore';
import BookMark from './Pages/BookMark';
import Profile from './Pages/Profile';
import Mockman from "mockman-js";
import { ToastContainer } from 'react-toastify';
import { useAuth } from './Context/AuthContext';

function App() {
  const ProtectedRoute = () => {
    const { token } = useAuth();
    const location = useLocation();
    return token ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }
  return (
    <div>
       <ToastContainer position='bottom-right'  autoClose={1200}
        reverseOrder={false} />
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
       <Route element={<ProtectedRoute/>}>
      <Route path="/home" element={<Home/>}></Route> 
      <Route path="/explore" element={<Explore/>}></Route>
      <Route path="/bookmark" element ={<BookMark/>}></Route>
      <Route path="/profile/:username" element={<Profile/>}></Route>
      </Route>
      <Route path="/mockman" element={<Mockman/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
