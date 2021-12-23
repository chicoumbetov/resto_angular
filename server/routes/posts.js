// controllers
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';

const express from "express";
const router = express.Router();

// reached by localhost:5000/posts
// router.get('/', getPosts);
// router.post('/', auth, createPost);
// router.patch('/:id', auth, updatePost);
// router.patch('/:id/likePost', auth, likePost);
// router.delete('/:id', auth, deletePost)

export default router
