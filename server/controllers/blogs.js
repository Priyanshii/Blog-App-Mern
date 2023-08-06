import express from 'express';
import mongoose from 'mongoose';

import Blog from '../models/Blog.js';
import User from '../models/User.js';

const router = express.Router();

export const getBlogs = async (req, res) => {
    const currentPage = Number(req.query.page) || 1;
    const LIMIT = 10;
    const skipPosts = (currentPage - 1) * LIMIT;
    try {
        const total = await Blog.countDocuments();
        const posts = await Blog.find().populate("author").sort({ createdAt: -1 }).limit(LIMIT).skip(skipPosts);
        res.status(200).json({ data: posts, current: Number(currentPage), numberOfPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBlogDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Blog.findById(id).populate("author");
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
  
export const createBlog = async (req, res) => {
  const blogData = req.body;
  console.log(blogData)
  console.log(req.user);
  const tagList = req.body.tags.map((tag) => {
    return { "name": tag };
  });

  try {
    const blog = await Blog.create({ ...blogData, tags: tagList, author: req.user._id });
    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
}

export const getBlogsByAuthor = async (req, res) => {
    const { id } = req.params;
    const currentPage = Number(req.query.page) || 1;
    const LIMIT = 10;
    const skipPosts = (currentPage - 1) * LIMIT;
    try {
        const total = await Blog.countDocuments({author: id});
        const posts = await Blog.find({ author: id }).populate("author").sort({ createdAt: -1 }).limit(LIMIT).skip(skipPosts);

        res.status(200).json({ data: posts, currentPage: Number(currentPage), numberOfPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBlogsBySearch = async (req, res) => {
    const {tag, search} = req.query;

    try {
      const searchInput = new RegExp(search, "i");
      const blogs = await Blog.find({ $and: [{ searchInput }, {tags: { $in : [tag]}}] }).populate("author");
      res.status(200).json({ data: blogs });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const saveUnsaveBlog = async (req, res) => {

  const user = await User.findById(req.user._id)
  const post = await Blog.findById(req.params.id);

  try {
    if(user.blogsSaved.includes(post._id.toString())){
      user.blogsSaved = user.blogsSaved.filter((p) => p.toString() !== post._id.toString());
      await user.save();

      return res.status(200).json({ success: true, message: "Post Unsaved"});
    }
    else {
      user.blogsSaved.push(post._id)

      await user.save();
      return res.status(200).json({ success: true, message: "Post Saved"});
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     await PostMessage.findByIdAndRemove(id);

//     res.json({ message: "Post deleted successfully." });
// }

// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!req.userId) {
//         return res.json({ message: "Unauthenticated" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const post = await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id === String(req.userId));

//     if (index === -1) {
//         post.likes.push(req.userId);
//     } else {
//         post.likes = post.likes.filter((id) => id !== String(req.userId));
//     }

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.status(200).json(updatedPost);
// }

// export const commentPost = async (req, res) => {
//     const { id } = req.params;
//     const { value } = req.body;

//     const post = await PostMessage.findById(id);

//     post.comments.push(value);

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.json(updatedPost);
// };

export default router;