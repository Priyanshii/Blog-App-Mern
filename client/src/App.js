import React, { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from "./pages";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getUserSuccess } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { getBookmarkedBlogs, getPopularTopicsList } from "./redux/slices/blogsSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("blog-user");
  
  useEffect(() => {
    dispatch(getUserSuccess(JSON.parse(userData)));
    dispatch(getPopularTopicsList());
    if( userData ){
      dispatch(getBookmarkedBlogs());
    }
  },[userData?.email])

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
      <div className="w-full relative">
        <ToastContainer 
          autoClose={2000}
          theme="colored"
          hideProgressBar={true}
          newestOnTop
        />
        <Router>
          <Pages />
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
