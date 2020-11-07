const express = require('express');
const queries = require('./users.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await queries.find();
  res.json(users);
});

module.exports = router;
