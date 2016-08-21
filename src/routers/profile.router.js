"use strict";

const Router = require('express').Router;
const Middleware = require('./middleware');

const ProfileRouter = Router();

ProfileRouter.use(Middleware.authMiddleware);

ProfileRouter.get('/profile', (req, res)=> {
    res.json(req.user);
});

module.exports = ProfileRouter;