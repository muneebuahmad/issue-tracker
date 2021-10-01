const express = require('express');
const router = express.Router();

const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');

router.get('/', (req, res) => {
  res.json('API Working');
});
router.use('/users', users);
router.use('/auth', auth);

module.exports = router;
