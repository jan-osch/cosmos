/// <reference path="./typings/tsd.d.ts"/>


import {attachUser} from "./middlewares/auth-middleware";
import {WebRouter} from "./routes/web-router";
import {AuthRouter} from "./routes/auth-router";
import {ProfileRouter} from "./routes/profile-router";
import {TemplateRouter} from "./routes/template-router";
/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var csrf = require('csurf');
var mongoose = require('mongoose');

// var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
var helpers = require('view-helpers');
var jade = require('jade');
var pkg = require('./package.json');

var env = process.env.NODE_ENV || 'development';


const connectionString = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/cosmos';
mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('open', ()=> {
    console.log('Connection to database is open');
});


/**
 * Expose
 */

const app = express();



// Compression middleware (should be placed before express.static)
app.use(compression({
    threshold: 512
}));

// Static files middleware
app.use(express.static(__dirname + '/public'));

// Use winston on production
var log;
if (env !== 'development') {
    log = {
        stream: {
            write: function (message, encoding) {
                winston.info(message);
            }
        }
    };
} else {
    log = 'dev';
}

// Don't log during tests
// Logging middleware
if (env !== 'test') app.use(morgan(log));

// set views path and default layout
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// expose package.json to views
app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
});

// bodyParser should be above methodOverride
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// cookieParser should be above session
app.use(cookieParser());
// app.use(cookieSession({secret: 'secret'}));
// app.use(session({
//     secret: pkg.name,
//     proxy: true,
//     resave: true,
//     saveUninitialized: true,
//     store: new mongoStore({
//         url: config.db,
//         collection: 'sessions'
//     })
// }));
//
// // use passport session
// app.use(passport.initialize());
// app.use(passport.session());

// connect flash for flash messages - should be declared after sessions
// app.use(flash());

// should be declared after session and flash
app.use(helpers(pkg.name));

// adds CSRF support
if (process.env.NODE_ENV !== 'test') {
    // app.use(csrf());
    //
    // // This could be moved to view-helpers :-)
    // app.use(function (req, res, next) {
    //     res.locals.csrf_token = req.csrfToken();
    //     next();
    // });
}

app.use(attachUser);
app.use(function (req, res, next) {
    req.isAuthenticated = ()=>req.user != undefined;
    next();
});


app.use('/', WebRouter);
app.use('/auth', AuthRouter);
app.use('/profile', ProfileRouter);
app.use('/template', TemplateRouter);



app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
        && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
        res.status(422).render('422', { error: err.stack });
        return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
});

// assume 404 since no middleware responded
app.use(function (req, res) {
    const payload = {
        url: req.originalUrl,
        error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
});

module.exports = app;