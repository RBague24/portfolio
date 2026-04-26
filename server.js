const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
let db;

const mongoClient = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
mongoClient.connect().then(() => {
  db = mongoClient.db('portfolio');
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1);
});

// ============================================
// PROJECTS ENDPOINTS
// ============================================

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection('projects').find({}).toArray();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new project
app.post('/api/projects', async (req, res) => {
  try {
    const { cat, name, desc } = req.body;
    if (!cat || !name || !desc) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await db.collection('projects').insertOne({
      id: new Date().getTime(),
      cat,
      name,
      desc,
      createdAt: new Date(),
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('projects').deleteOne({ id: parseInt(id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// PORTFOLIO (CLIENT WEBSITES) ENDPOINTS
// ============================================

// GET all portfolio items
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await db.collection('portfolio').find({}).toArray();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new portfolio item
app.post('/api/portfolio', async (req, res) => {
  try {
    const { company, url, desc, img } = req.body;
    if (!company || !url || !desc) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await db.collection('portfolio').insertOne({
      id: new Date().getTime(),
      company,
      url,
      desc,
      img: img || '',
      createdAt: new Date(),
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE portfolio item
app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('portfolio').deleteOne({ id: parseInt(id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// SERVICES ENDPOINTS
// ============================================

// GET all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.collection('services').find({}).toArray();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new service
app.post('/api/services', async (req, res) => {
  try {
    const { name, price, desc, features } = req.body;
    if (!name || !price || !desc || !features) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await db.collection('services').insertOne({
      id: new Date().getTime(),
      name,
      price: parseInt(price),
      desc,
      features: Array.isArray(features) ? features : features.split(',').map(f => f.trim()),
      createdAt: new Date(),
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE service
app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('services').deleteOne({ id: parseInt(id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// COURSES ENDPOINTS
// ============================================

// GET all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await db.collection('courses').find({}).toArray();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new course
app.post('/api/courses', async (req, res) => {
  try {
    const { name, platform, status, progress } = req.body;
    if (!name || !platform || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await db.collection('courses').insertOne({
      id: new Date().getTime(),
      name,
      platform,
      status,
      progress: parseInt(progress) || 0,
      createdAt: new Date(),
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE course
app.delete('/api/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('courses').deleteOne({ id: parseInt(id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// DIPLOMAS ENDPOINTS
// ============================================

// GET all diplomas
app.get('/api/diplomas', async (req, res) => {
  try {
    const diplomas = await db.collection('diplomas').find({}).toArray();
    res.json(diplomas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new diploma
app.post('/api/diplomas', async (req, res) => {
  try {
    const { name, institution, year, img } = req.body;
    if (!name || !institution || !year) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await db.collection('diplomas').insertOne({
      id: new Date().getTime(),
      name,
      institution,
      year: parseInt(year),
      img: img || '',
      createdAt: new Date(),
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE diploma
app.delete('/api/diplomas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('diplomas').deleteOne({ id: parseInt(id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// BUSINESS DESCRIPTION ENDPOINTS
// ============================================

// GET business description
app.get('/api/business-desc', async (req, res) => {
  try {
    let desc = await db.collection('settings').findOne({ key: 'businessDescription' });
    if (!desc) {
      desc = { key: 'businessDescription', value: 'Welcome to my freelance web development services. I specialize in creating custom websites tailored to your business needs.' };
    }
    res.json({ description: desc.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE business description
app.post('/api/business-desc', async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    await db.collection('settings').updateOne(
      { key: 'businessDescription' },
      { $set: { key: 'businessDescription', value: description, updatedAt: new Date() } },
      { upsert: true }
    );
    res.json({ success: true, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running ✅' });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API base: http://localhost:${PORT}/api`);
});
