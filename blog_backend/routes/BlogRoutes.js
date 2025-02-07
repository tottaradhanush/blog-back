// backend/routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create a new blog
router.post('/blogs', async (req, res) => {
    const { title, author, date, image, content, genre } = req.body;
    try {
        const newBlog = new Blog({
            title,
            author,
            date,
            image,
            content,
            genre
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update a blog
router.put('/blogs/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete a blog
router.delete('/blogs/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.send('Blog deleted');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
