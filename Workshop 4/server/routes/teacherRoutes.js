const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.teacherGet);
router.post('/', teacherController.teacherPost);

module.exports = router;
