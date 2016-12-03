/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response, Router} from "express";
import {User} from "../models/user";


export const WebRouter = Router();

WebRouter.get('/', function (req:Request, res:Response) {
    res.render('articles/index', {
        title: 'Articles',
        articles: [],
        page: 1 + 1,
        pages: Math.ceil(1 / 2),
        req: req
    })
});


WebRouter.get('/login', function (req, res) {
    res.render('users/login', {
        title: 'Login',
        req: req
    });
});

WebRouter.get('/signup', function (req, res) {
    const user = new User();

    res.render('users/signup', {
        title: 'Sign up',
        req: req,
        user:user
    });
});


WebRouter.get('/users/:id', function (req, res) {
    const user = req.user;
    res.render('users/show', {
        title: user.name,
        user: user
    });
});