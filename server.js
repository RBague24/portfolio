const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware - MUST be first
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '50mb' }));

// MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
let db;

const mongoClient = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect()
  .then(() => {
    db = mongoClient.db('portfolio');
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
  });

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running ✅', timestamp: new Date() });
});

// ========== PROJECTS ==========
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection('projects').find({}).toArray();
    res.json(projects || []);
  } catch (err) {
    console.error('GET /api/projects error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { cat, name, desc } = req.body;
    if (!cat || !name || !desc) return res.status(400).json({ error: 'Missing fields' });
    
    const result = await db.collection('projects').insertOne({
      id: Date.now(),
      cat, name, desc,
      createdAt: new Date()
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    console.error('POST /api/projects error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await db.collection('projects').deleteOne({ id: parseInt(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/projects error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ========== PORTFOLIO ==========
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await db.collection('portfolio').find({}).toArray();
    res.json(portfolio || []);
  } catch (err) {
    console.error('GET /api/portfolio error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/portfolio', async (req, res) => {
  try {
    const { company, url, desc, img } = req.body;
    if (!company || !url || !desc) return res.status(400).json({ error: 'Missing fields' });
    
    const result = await db.collection('portfolio').insertOne({
      id: Date.now(),
      company, url, desc, img: img || '',
      createdAt: new Date()
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    console.error('POST /api/portfolio error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    await db.collection('portfolio').deleteOne({ id: parseInt(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/portfolio error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ========== SERVICES ==========
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.collection('services').find({}).toArray();
    res.json(services || []);
  } catch (err) {
    console.error('GET /api/services error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const { name, price, desc, features } = req.body;
    if (!name || !price || !desc || !features) return res.status(400).json({ error: 'Missing fields' });
    
    const featuresList = Array.isArray(features) ? features : 
      (typeof features === 'string' ? features.split(',').map(f => f.trim()) : []);
    
    const result = await db.collection('services').insertOne({
      id: Date.now(),
      name, price: parseInt(price), desc, features: featuresList,
      createdAt: new Date()
    });
    res.json({ id: result.insertedId, ...req.body, features: featuresList });
  } catch (err) {
    console.error('POST /api/services error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await db.collection('services').deleteOne({ id: parseInt(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/services error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ========== COURSES ==========
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await db.collection('courses').find({}).toArray();
    res.json(courses || []);
  } catch (err) {
    console.error('GET /api/courses error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const { name, platform, status, progress } = req.body;
    if (!name || !platform || !status) return res.status(400).json({ error: 'Missing fields' });
    
    const result = await db.collection('courses').insertOne({
      id: Date.now(),
      name, platform, status, progress: parseInt(progress) || 0,
      createdAt: new Date()
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    console.error('POST /api/courses error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await db.collection('courses').deleteOne({ id: parseInt(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/courses error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ========== DIPLOMAS ==========
app.get('/api/diplomas', async (req, res) => {
  try {
    const diplomas = await db.collection('diplomas').find({}).toArray();
    res.json(diplomas || []);
  } catch (err) {
    console.error('GET /api/diplomas error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/diplomas', async (req, res) => {
  try {
    const { name, institution, year, img } = req.body;
    if (!name || !institution || !year) return res.status(400).json({ error: 'Missing fields' });
    
    const result = await db.collection('diplomas').insertOne({
      id: Date.now(),
      name, institution, year: parseInt(year), img: img || '',
      createdAt: new Date()
    });
    res.json({ id: result.insertedId, ...req.body });
  } catch (err) {
    console.error('POST /api/diplomas error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/diplomas/:id', async (req, res) => {
  try {
    await db.collection('diplomas').deleteOne({ id: parseInt(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/diplomas error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ========== BUSINESS DESCRIPTION ==========
app.get('/api/business-desc', async (req, res) => {
  try {
    let desc = await db.collection('settings').findOne({ key: 'businessDescription' });
    if (!desc) {
      desc = { value: 'Welcome to my freelance web development services.' };
    }
    res.json({ description: desc.value });
  } catch (err) {
    console.error('GET /api/business-desc error:', err);
    res.json({ description: 'Welcome to my freelance web development services.' });
  }
});

app.post('/api/business-desc', async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: 'Description required' });
    
    await db.collection('settings').updateOne(
      { key: 'businessDescription' },
      { $set: { key: 'businessDescription', value: description, updatedAt: new Date() } },
      { upsert: true }
    );
    res.json({ success: true, description });
  } catch (err) {
    console.error('POST /api/business-desc error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
