const Course = require("../models/courseModel");

const coursePost = async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.error('Error al guardar el curso:', err.message);
    res.status(422).json({ error: 'There was an error saving the course' });
  }
};

const courseGet = (req, res) => {
  let query = {};
  let sort = {};

  if (req.query.name) {
    query.name = { $regex: req.query.name, $options: 'i' };
  }

  if (req.query.sort) {
    sort.name = req.query.sort === 'asc' ? 1 : -1;
  }

  Course.find(query).populate('teacher').sort(sort)
    .then(courses => res.json(courses))
    .catch(err => res.status(422).json({ "error": err }));
};

module.exports = {
  coursePost,
  courseGet
};
