import express from "express";
import { addPost, getAllPosts, getOnePost, getOnePostByUID, updatePost, deletePost } from "../controllers/postsControllers.js";

const router = express.Router();

// Add new post
router.post("/posts", addPost);

// Fetch all posts
router.get("/posts", getAllPosts);

// Fetch one post by post ID
router.get("/posts/:post_id", getOnePost);

// Fetch a post and user by user id
router.get("/posts/:UserID", getOnePostByUID)

// Update post
router.put("/posts/:post_id", updatePost);

// Delete post
router.delete("/posts/:post_id", deletePost);

export default router;
