'use strict';

let express = require('express');
let app = express();

const config = require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const AuthRouter = require('./src/routers/auth.router');
const ProfileRouter = require('./src/routers/profile.router');

const debug = require('debug')('alttab:main');

mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', AuthRouter);
app.use('/api', ProfileRouter);

app.listen(config.main.port, ()=> {
    debug(`Application listening on port ${config.main.port}`)
});

module.exports = app;
