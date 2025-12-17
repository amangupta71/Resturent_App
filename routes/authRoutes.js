const express = require('express');
const { registerController,loginController } = require('../controllers/authContoller');

const router = express.Router();

// routes
// register/login , post
router.post('/register',registerController);
router.post('/login',loginController);


module.exports = router;