require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { userPost, userGet, userPatch, userDelete, login, authenticateToken } = require('./controllers/userController');
const { teacherGet, teacherPost, teacherPatch, teacherDelete } = require('./controllers/teacherController');
const { courseGet, coursePost } = require('./controllers/courseController');

const app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');
}).catch(err => {
  console.error('Error connecting to the database:', err.message);
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/users', userPost);
app.post('/api/login', login);

app.get('/api/users', authenticateToken, userGet);
app.patch('/api/users', authenticateToken, userPatch);
app.delete('/api/users', authenticateToken, userDelete);

app.get('/api/teachers', authenticateToken, teacherGet);
app.post('/api/teachers', authenticateToken, teacherPost);
app.patch('/api/teachers', authenticateToken, teacherPatch);
app.delete('/api/teachers', authenticateToken, teacherDelete);

app.get('/api/courses', authenticateToken, courseGet);
app.post('/api/courses', authenticateToken, coursePost);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


//Rutas Crear usuario http://localhost:3001/api/users
/*{
  "username": "testuser",
  "password": "password123",
  "first_name": "Test",
  "last_name": "User"
}*/

//Probar login http://localhost:3001/api/login

/*{
  "username": "testuser",
  "password": "password123"
}
*/

//Obtener usuarios http://localhost:3001/api/users Y poner el token generado en headers
 
