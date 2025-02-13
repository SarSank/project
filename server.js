import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Update CORS configuration
app.use(cors({
    origin: ['http://localhost:5175', 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false, // Changed to false since we're not using cookies
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Remove duplicate middleware
app.use(express.json());
app.use(express.static('public'));

// Add better error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ 
            message: 'Invalid token or no token provided' 
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ 
            message: err.message 
        });
    }

    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Add request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Other middleware
app.use(express.json());
app.use(express.static('public'));

// Add these before your routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

// Add detailed logging for auth routes
app.use('/api/auth/*', (req, res, next) => {
    console.log('Auth request received:', {
        method: req.method,
        path: req.path,
        body: req.body,
        headers: req.headers
    });
    next();
});

// Routes
app.use('/api/auth', authRoutes);

// Serve auth page as main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok',
        time: new Date().toISOString(),
        message: 'Server is running'
    });
});

// Connect to MongoDB
connectDB().then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port localhost:${PORT}`)); 