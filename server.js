const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

const registerUserRoutes = require('./routes/registerUserRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerCodeRoutes = require('./routes/registerCodeRoutes');
const historyRoutes = require('./routes/historyRoutes');
const winnersRoutes = require('./routes/winnersRoutes');
const adminRegistrationRoutes = require('./routes/adminRegistrationRoutes');

dotenv.config();
const app = express();

// CORS
const allowedOrigins = [
  'https://front-loco.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rutas
app.get('/api', (req, res) => {
  res.send('back loco en vivo');
});

app.use('/api/register', registerUserRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/register-code', registerCodeRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/winners', winnersRoutes);
app.use('/api/admin', adminRegistrationRoutes);

// Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ msg: 'Ruta no encontrada' });
});

// Exportar como función serverless
module.exports = app;
module.exports.handler = serverless(app);
