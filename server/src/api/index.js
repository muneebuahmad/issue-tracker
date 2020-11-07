const express = require('express');
const router = express.Router();

const users = require('./users/users.routes');

router.get('/', (req, res) => {
  res.json('API Working');
});
router.use('/users', users);

module.exports = router;
