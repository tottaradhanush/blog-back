// backend/models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    image: String,
    content: String,
    genre: String,
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [
        {
            text: String,
            date: String
        }
    ]
});

module.exports = mongoose.model('Blog', blogSchema);
