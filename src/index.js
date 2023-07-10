import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from './server';
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from './Context/AuthContext';
import { PostProvider } from './Context/PostContext';
import { UserProvider } from './Context/UserContext';
import { BookmarkProvider } from './Context/BookmarkContext';
import { CommentProvider } from './Context/CommentContext';
import ThemeProvider from './Context/ThemeContext';

makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider>
        <PostProvider>
          <UserProvider>
            <BookmarkProvider>
              <CommentProvider>
              <App />
              </CommentProvider>
            </BookmarkProvider>
          </UserProvider>
        </PostProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
