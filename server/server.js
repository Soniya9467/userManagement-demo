const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

mongoose.connect('mongodb://localhost:27017/user_roles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => console.log('Server running on port 5000'));
