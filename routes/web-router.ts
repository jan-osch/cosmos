/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response, Router} from "express";

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
    console.log('kaka')
    res.render('users/signup', {
        title: 'Sign up',
        req: req
    });
});
