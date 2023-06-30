import './App.css';
import Login from './Pages/Login';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Home from "./Pages/Home"
import Explore from './Pages/Explore';
import BookMark from './Pages/BookMark';
import Profile from './Pages/Profile';
import PostDetails from './Pages/PostDetails';

function App() {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/home" element={<Home/>}></Route> 
      <Route path="/explore" element={<Explore/>}></Route>
      <Route path="/bookmark" element ={<BookMark/>}></Route>
      <Route path="/profile/:username" element={<Profile/>}></Route>
      <Route path="/post/:postId" element={<PostDetails/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
