
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

mongoose.connect("mongodb://127.0.0.1:27017/carrerasDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const carreraSchema = new mongoose.Schema({
    nombre: String,
    codigo: String,
    descripcion: String
});

const Carrera = mongoose.model('Carrera', carreraSchema);

app.use(bodyParser.json());
app.use(cors());

// GET all carreras
app.get('/api/carreras', async (req, res) => {
    const carreras = await Carrera.find();
    res.json(carreras);
});

// GET a single carrera
app.get('/api/carreras/:id', async (req, res) => {
    const carrera = await Carrera.findById(req.params.id);
    res.json(carrera);
});

// POST a new carrera
app.post('/api/carreras', async (req, res) => {
    const newCarrera = new Carrera(req.body);
    const savedCarrera = await newCarrera.save();
    res.json(savedCarrera);
});

// PUT update a carrera
app.put('/api/carreras/:id', async (req, res) => {
    const updatedCarrera = await Carrera.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCarrera);
});

// DELETE a carrera
app.delete('/api/carreras/:id', async (req, res) => {
    await Carrera.findByIdAndDelete(req.params.id);
    res.json({ message: 'Carrera deleted' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


//Crear Carerra http://localhost:3001/api/carreras
/*{
    "nombre": "Ingeniería Civil",
    "codigo": "1",
    "descripcion": "Carrera de Ingeniería Civil"
} 
*/

// Actualizar http://localhost:3001/api/carreras/<id>

/*{
    "nombre": "Ingeniería Civil",
    "codigo": "1",
    "descripcion": "Carrera de Ingeniería Civil actualizada"
} 
*/

//Eliminar http://localhost:3001/api/carreras/<id>

//Get todas las carreras http://localhost:3001/api/carreras

//Get carrera por ID http://localhost:3001/api/carreras/<id>
