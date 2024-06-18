const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());

// Endpoint GET /hola
app.get('/hola', (req, res) => {
  const mensaje = req.query.mensaje || 'Mundo';
  res.json({ respuesta: `Hola ${mensaje}` });
});

// Endpoint POST /usuario
app.post('/usuario', (req, res) => {
  const { nombre, apellido } = req.body;
  if (nombre && apellido) {
    res.json({ respuesta: `El usuario ${nombre} ${apellido} fue creado` });
  } else {
    res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }
});

// Iniciar la aplicación
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});


//http://localhost:3000/hola
//http://localhost:3000/hola?mensaje=Universo
//http://localhost:3000/usuario