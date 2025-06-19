const express = require('express');
const router = express.Router();
const multer = require('multer');
/* const auth = require('../Middleware/auth.js'); */
const { createEvent, getAllEvents } = require('../Controller/eventC.js');

const upload = multer({ dest: 'uploads/' });


router.post('/create', upload.single('bannerImage'), createEvent);
router.get('/get', getAllEvents);

module.exports = router;
