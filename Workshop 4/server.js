const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agrega esto
const app = express();
const config = require('./config');

// Middlewares
app.use(bodyParser.json());
app.use(cors()); // Agrega esto

// MongoDB connection
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Serve static files from public directory
app.use(express.static('public'));

// Routes
const courseRoutes = require('./server/routes/courseRoutes');
const teacherRoutes = require('./server/routes/teacherRoutes');

app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
