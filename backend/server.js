const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB Connected'))
.catch(err => console.error(' MongoDB Error:', err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
