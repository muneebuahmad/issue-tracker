const express = require('express');
const yup = require('yup');

const router = express.Router();

function validatePassword(username, password) {
  return (
    password.toLowerCase() !== username.toLowerCase() &&
    yup
      .string()
      .min(8)
      .matches(/[^A-Za-z0-9]/)
      .matches(/[A-Z]/)
      .matches(/[a-z]/)
      .matches(/[0-9]/)
      .validate(password)
  );
}

router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (validatePassword(name, password)) {
      res.json({
        message: 'OK',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signin', (req, res, next) => {
  res.json({ message: 'Signin' });
});

module.exports = router;
