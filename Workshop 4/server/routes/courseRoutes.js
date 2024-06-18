const express = require('express');
const router = express.Router();
const { courseGet, coursePost } = require('../controllers/courseController'); // Ajusta esta línea

router.get('/', courseGet);
router.post('/', coursePost);

module.exports = router;
