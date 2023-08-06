import { createSlice } from '@reduxjs/toolkit';
import axios from '../Api';
import { removeUserData } from './authSlice';

const initialState = {  
  loading: false,
  error: {isError: false, message: ''},
  blogsList: [],
  blogDetails: {},
  bookmarkedBlogs: [],
  searchedBlogs: [],
  userPublishedBlogs: [],
};

const blogsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    addBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = {isError: false, message: ''};
    },
    addBlogFailure: (state, { payload }) => {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    setBlogsSuccess: (state, { payload })=> {
      state.loading = false;
      state.blogsList = payload;
      state.error = {isError: false, message: ''};
    },
    setBlogsFailure: (state, { payload })=> {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    setBlogDetailsSuccess: (state, { payload })=> {
      state.loading = false;
      state.blogDetails = payload;
      state.error = {isError: false, message: ''};
    },
    setBlogDetailsFailure: (state, { payload })=> {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    setBookmarkedBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.bookmarkedBlogs = payload;
      state.error = {isError: false, message: ''};
    },
    setBookmarkedBlogFailure: (state, { payload }) => {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    setSearchedBlogsSuccess: (state, { payload })=>{
      state.loading = false;
      state.searchedBlogs = payload;
      state.error = {isError: false, message: ''};
    },
    setSearchedBlogsFailure: (state, { payload })=>{
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    setUserPublishedBlogsSuccess: (state, { payload })=>{
      state.loading = false;
      state.userPublishedBlogs = payload;
      state.error = {isError: false, message: ''};
    },
    setUserPublishedBlogsFailure: (state, { payload })=>{
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
  },
});

export const { setLoading, addBlogSuccess, addBlogFailure, setBlogsSuccess, setBlogsFailure, setBlogDetailsSuccess, setBlogDetailsFailure, setBookmarkedBlogSuccess, setBookmarkedBlogFailure, setSearchedBlogsSuccess, setSearchedBlogsFailure, setUserPublishedBlogsSuccess, setUserPublishedBlogsFailure } = blogsSlice.actions;

export default blogsSlice.reducer;

export const getAllBlogs = () => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/blog`);
    dispatch(setBlogsSuccess(response.data.data));
  } catch (error) {
    console.log(error.message);
    dispatch(setBlogsFailure(error.message))
  }
}

export const getBlogDetails = (blogId) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response =  await axios.get(`/blog/${blogId}`);
    dispatch(setBlogDetailsSuccess(response.data));
  } catch (error) {
    console.log(error.message);
    dispatch(setBlogDetailsFailure(error.message))
  }
}

export const getBlogsByAuthor = (userId) => async(dispatch) => {
  console.log(userId);
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/blog/author/${userId}`);
    dispatch(setUserPublishedBlogsSuccess(response.data.data));
  } catch (error) {
    console.log(error.message);
    dispatch(setUserPublishedBlogsFailure(error.message))
  }
}

export const getSearchedBlogs = (query) => async(dispatch) => {
  console.log(query);
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/blog/search?`, {
      params: query,
    });
    console.log(response.data);
    dispatch(setSearchedBlogsSuccess(response.data.data));
  } catch (error) {
    console.log(error);
    dispatch(setSearchedBlogsFailure(error.response.data.message))
  }
}
export const createNewBlog = (blogData) => async(dispatch) => {
  const { title, content, tagList } = blogData;
  console.log(title, content, tagList);
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`/blog`, {
      title,
      content,
      tags: tagList,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error)
    dispatch(addBlogFailure(error.response.data.message))
  }
}

export const BookmarkBlog = (id) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`/blog/bookmarks/${id}`);
    console.log(response.data);
    dispatch(setBookmarkedBlogSuccess(response.data))
  } catch (error) {
    console.log(error)
    dispatch(setBookmarkedBlogFailure(error.response.data.message))
  }
}

export const updateBlog = (blogData) => async(dispatch) => {
  const { id: blogId } = blogData;
  try {
    dispatch(setLoading(true));
    const response = await axios.patch(`/blog/${blogId}`, blogData);
    console.log(response.data);
  } catch (error) {
    
  }
}

export const deleteBlog = (blogId) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.delete(`/blog/${blogId}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export const updateBookmarkedBlogs = (blogId) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`/bookmarkedBlogs/${blogId}`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}