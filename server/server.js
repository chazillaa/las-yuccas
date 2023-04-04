require('dotenv').config();

const express = require('express');

const mongodb = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongodb.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});