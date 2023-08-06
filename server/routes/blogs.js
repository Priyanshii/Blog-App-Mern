import express from 'express';
import { createBlog, getBlogDetails, getBlogs, getBlogsByAuthor, getBlogsBySearch, saveUnsaveBlog } from '../controllers/blogs.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', auth, getBlogsBySearch);
router.get('/author/:id', auth, getBlogsByAuthor);
router.get('/', getBlogs);
router.get('/:id', getBlogDetails);

router.post('/bookmarks/:id', auth, saveUnsaveBlog );
router.post('/', auth, createBlog);
// router.patch('/:id', auth, updateBlog);
// router.delete('/:id', auth, deleteBlog);
// // router.patch('/:id/likeBlog', auth, likeBlog);
// // router.post('/:id/commentBlog', auth, commentBlog);

export default router;