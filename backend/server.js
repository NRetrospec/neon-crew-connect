const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const POSTS_FILE = path.join(__dirname, 'posts.json');

// Load posts from file
function loadPosts() {
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf8');
    const posts = JSON.parse(data);
    // Migrate old posts to have comments as array
    posts.forEach(post => {
      if (!Array.isArray(post.comments)) {
        post.comments = [];
      }
    });
    return posts;
  } catch (err) {
    return [];
  }
}

// Save posts to file
function savePosts(posts) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Initialize posts
let posts = loadPosts();

// Routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { username, content, game } = req.body;
  if (!username || !content) {
    return res.status(400).json({ error: 'Username and content are required' });
  }

  const newPost = {
    id: uuidv4(),
    username,
    game: game || '',
    content,
    likes: 0,
    comments: [],
    timestamp: new Date().toISOString(),
  };

  posts.unshift(newPost); // Add to beginning
  savePosts(posts);
  res.status(201).json(newPost);
});

app.patch('/api/posts/:id/like', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  post.likes += 1;
  savePosts(posts);
  res.json(post);
});

app.post('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { username, content } = req.body;
  if (!username || !content) {
    return res.status(400).json({ error: 'Username and content are required' });
  }
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const newComment = {
    id: uuidv4(),
    username,
    content,
    timestamp: new Date().toISOString(),
  };
  post.comments.push(newComment);
  savePosts(posts);
  res.status(201).json(newComment);
});

app.get('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post.comments);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
