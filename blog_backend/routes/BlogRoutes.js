const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const mongoose = require('mongoose');

// Get all blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).send('Server Error');
    }
});

// Get a single blog by ID
router.get('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
    }
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.json(blog);
    } catch (err) {
        console.error("Error fetching blog:", err);
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
        console.error("Error creating blog:", err);
        res.status(500).send('Server Error');
    }
});

// Update a blog
router.put('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).send('Blog not found');
        }
        res.json(updatedBlog);
    } catch (err) {
        console.error("Error updating blog:", err);
        res.status(500).send('Server Error');
    }
});


// Delete a blog
router.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).send('Blog not found');
        }
        res.send('Blog deleted');
    } catch (err) {
        console.error("Error deleting blog:", err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;