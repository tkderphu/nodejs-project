const express = require('express');
const winston = require('winston');
const app = express();

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

app.get('/', (req, res, next) => {
    throw new Error('Something went wrong!');
});

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
    logger.error(err.message, { metadata: err.stack });
    res.status(500).json({ error: err.message });
}

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});