// backend/app.js
const express = require('express');
const mongoose=require('mongoose')
const cors = require('cors');
const blogRoutes = require('./routes/BlogRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(cors({ origin: '*' }));

app.use(express.json());

// Routes
app.use('/api', blogRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
