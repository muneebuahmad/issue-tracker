const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const middlewares = require('./middlewares');
const api = require('./api/index');

const app = express();
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

// app.get('/', (req, res) => {
//   res.json({
//     message: 'API Working',
//   });
// });

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
