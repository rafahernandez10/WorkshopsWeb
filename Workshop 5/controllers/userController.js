const User = require('../models/userModel');
const Session = require('../models/sessionModel');
const crypto = require('crypto');

const userPost = async (req, res) => {
  const { username, password, first_name, last_name } = req.body;
  const user = new User({ username, password, first_name, last_name });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(422).json({ error: 'There was an error saving the user', details: err.message });
  }
};

const userGet = (req, res) => {
  if (req.query && req.query.id) {
    User.findById(req.query.id)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(404).json({ error: "User doesn't exist" });
      });
  } else {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      });
  }
};

const userPatch = (req, res) => {
  if (req.query && req.query.id) {
    User.findById(req.query.id, async function (err, user) {
      if (err) {
        res.status(404).json({ error: "User doesn't exist" });
      }

      user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
      user.last_name = req.body.last_name ? req.body.last_name : user.last_name;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      user.save(function (err) {
        if (err) {
          res.status(422).json({ error: 'There was an error saving the user' });
        }
        res.status(200).json(user);
      });
    });
  } else {
    res.status(404).json({ error: "User doesn't exist" });
  }
};

const userDelete = (req, res) => {
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404).json({ error: "User doesn't exist" });
      }

      user.deleteOne(function (err) {
        if (err) {
          res.status(422).json({ error: 'There was an error deleting the user' });
        }
        res.status(204).json({});
      });
    });
  } else {
    res.status(404).json({ error: "User doesn't exist" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      const token = crypto.createHash('md5').update(user._id.toString() + Date.now()).digest('hex');
      const session = new Session({ token, user: user._id });
      await session.save();
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  try {
    const session = await Session.findOne({ token }).populate('user');
    if (!session) return res.sendStatus(403);

    req.user = session.user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  userPost,
  userGet,
  userPatch,
  userDelete,
  login,
  authenticateToken
};
