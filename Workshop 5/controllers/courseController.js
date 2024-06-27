const Course = require('../models/courseModel');

const courseGet = (req, res) => {
  if (req.query && req.query.id) {
    Course.findById(req.query.id).populate('teacher')
      .then(course => {
        res.json(course);
      })
      .catch(err => {
        res.status(404).json({ error: "Course doesn't exist" });
      });
  } else {
    Course.find().populate('teacher')
      .then(courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      });
  }
};

const coursePost = async (req, res) => {
  const course = new Course(req.body);
  try {
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(422).json({ error: 'There was an error saving the course' });
  }
};

module.exports = {
  courseGet,
  coursePost
};
