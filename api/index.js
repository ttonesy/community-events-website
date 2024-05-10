const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const User = require('./models/User'); 
const Post = require('./models/Post');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser'); 
const multer = require('multer');
const uploadMiddleWare = multer({dest: 'uploads/'});
const fs = require('fs');

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = 'alkdjalkgsjks'; 

// CORS and Middleware setup
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}));
app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/blog')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, salt);
        const userDoc = await User.create({
            username,
            password: hashedPassword
        });
        res.json(userDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

// Login user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
            const token = jwt.sign({ username, id: userDoc._id }, secret);
            res.cookie('token', token, { httpOnly: true }).json({ 
                    id:userDoc._id,
                    username,
             });
        } else {
            res.status(400).json({ message: 'wrong credentials' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Profile endpoint
app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: 'Failed to authenticate token.' });
            } else {
                res.json(decoded);
            }
        });
    } else {
        res.status(401).json({ message: 'No token provided.' });
    }
});

// Logout endpoint
app.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) }).json({ message: 'Logged out successfully' });
});

app.post('/post', uploadMiddleWare.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    

    const {title, summary, content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        //author:
    });

    res.json(postDoc);
});

app.get('/post', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});


// Start server
app.listen(4000, () => console.log('Server running on port 4000'));
