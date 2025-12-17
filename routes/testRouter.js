const express = require('express')
const{testUserController} = require("../controllers/testController");


//router object
const router = express.Router();

//different routes get/post/put/delete
router.get('/test-user',testUserController);


module.exports = router;