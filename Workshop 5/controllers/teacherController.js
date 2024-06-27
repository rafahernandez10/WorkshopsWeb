const Teacher = require('../models/teacherModel');

const teacherGet = (req, res) => {
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id)
      .then(teacher => {
        res.json(teacher);
      })
      .catch(err => {
        res.status(404).json({ error: "Teacher doesn't exist" });
      });
  } else {
    Teacher.find()
      .then(teachers => {
        res.json(teachers);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      });
  }
};

const teacherPost = async (req, res) => {
  const teacher = new Teacher(req.body);
  try {
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(422).json({ error: 'There was an error saving the teacher' });
  }
};

const teacherPatch = (req, res) => {
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404).json({ error: "Teacher doesn't exist" });
      }

      teacher.first_name = req.body.first_name ? req.body.first_name : teacher.first_name;
      teacher.last_name = req.body.last_name ? req.body.last_name : teacher.last_name;

      teacher.save(function (err) {
        if (err) {
          res.status(422).json({ error: 'There was an error saving the teacher' });
        }
        res.status(200).json(teacher);
      });
    });
  } else {
    res.status(404).json({ error: "Teacher doesn't exist" });
  }
};

const teacherDelete = (req, res) => {
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404).json({ error: "Teacher doesn't exist" });
      }

      teacher.deleteOne(function (err) {
        if (err) {
          res.status(422).json({ error: 'There was an error deleting the teacher' });
        }
        res.status(204).json({});
      });
    });
  } else {
    res.status(404).json({ error: "Teacher doesn't exist" });
  }
};

module.exports = {
  teacherGet,
  teacherPost,
  teacherPatch,
  teacherDelete
};
