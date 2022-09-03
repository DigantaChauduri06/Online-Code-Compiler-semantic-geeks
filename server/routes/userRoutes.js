const router = require('express').Router();

const { registerUser, loginUser, getAuthUsersDetails } = require('../controllers/userControllers');

const auth = require('./../middleware/authenticate');


// register user
router.post('/register', registerUser);

// login user
router.post('/login', loginUser);

// profile details of user
router.get('/getAuthUserDetails', auth, getAuthUsersDetails);


module.exports = router;