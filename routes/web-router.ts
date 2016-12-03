/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response, Router} from "express";
import {User} from "../models/user";
import {TaskPrototype} from "template.ts";
import * as TemplateService from "../services/template-service";

export const WebRouter = Router();

WebRouter.get('/', function (req:Request, res:Response) {
    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const limit = 30;

    const options = {
        limit: limit,
        offset: page * limit
    };

    Promise.all([
        TemplateService.countAll({}),
        TemplateService.getAll(options)]
    ).then(results => {
        const count = results[0];
        const templates = results[1];

        return res.render('template/index', {
            title: 'Templates',
            templates: templates,
            page: page + 1,
            pages: Math.ceil(count / limit)
        });
    });
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
        user: user
    });
});


WebRouter.get('/users/:id', function (req, res) {
    const user = req.user;
    res.render('users/show', {
        title: user.name,
        user: user
    });
});