"use strict";

const Router = require('express').Router;
const AuthActions = require('../actions/auth.actions');

const AuthRouter = Router();

AuthRouter.post('/register', (req, res)=> {
    AuthActions
        .register(req.body.name, req.body.password, req.body.email)
        .then(token=> {
            res.status(201)
                .json({token: token});
        })
        .catch(e=> {
            res.status(400)
                .json({error: e});
        });
});

AuthRouter.post('/login', (req, res)=> {
    AuthActions
        .login(req.body.email, req.body.password)
        .then(token=> {
            res.status(200)
                .json({token: token})
        })
        .catch(e=> {
            res.status(400)
                .json({error: e})
        });
});

module.exports = AuthRouter;