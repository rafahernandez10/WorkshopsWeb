const Teacher = require("../models/teacherModel");

/**
 * Crea un maestro
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = async (req, res) => {
  let teacher = new Teacher(req.body);
  try {
    teacher = await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(422).json({ error: 'Error al guardar el maestro' });
    console.error('Error saving teacher:', err);
  }
};

/**
 * Obtiene todos los maestros o uno específico
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = async (req, res) => {
  try {
    if (req.query.id) {
      const teacher = await Teacher.findById(req.query.id);
      if (!teacher) {
        return res.status(404).json({ error: "Maestro no encontrado" });
      }
      return res.json(teacher);
    }

    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(422).json({ error: err.message });
    console.error('Error retrieving teachers:', err);
  }
};

module.exports = {
  teacherPost,
  teacherGet
};
