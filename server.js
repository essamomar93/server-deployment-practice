'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const notFoundHandler = require('./handlers/404');
const errorHandler = require('./handlers/500');
const stamper = require('./middleware/stamper');

app.get('/', (req, res) => {
    res.status(200).send('All is good ');
});

app.get('/data', stamper, (req, res) => {

    const outputObject = {
        10: "even",
        5: "odd",
        "time": req.timestamp
    };
    res.status(200).json(outputObject);
});


app.get('/bad', (req, res, next) => {
    throw new Error('You made an Error');
});


app.use('*', notFoundHandler);
app.use(errorHandler);

function start() {
    app.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    });
}

module.exports = {
    app,
    start
};