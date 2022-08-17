var express = require('express');
var router = express.Router();

const auth = require('../controllers/auth')


router.options('*', function (req, res, next) {
  res.send();
});

router.post('/register', auth.registerUser);

router.post('/login', auth.login);


module.exports = router;
