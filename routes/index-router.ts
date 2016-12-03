/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response, Router} from "express";

export const IndexRouter = Router();

IndexRouter.get('/', function (req:Request, res:Response) {
    console.log('STARTEND')
    console.log('STARTEND')
    console.log('STARTEND')
    console.log('STARTEND')
    res.render('articles/index', {
        title: 'Articles',
        articles: [],
        page: 1 + 1,
        pages: Math.ceil(1/ 2),
        req: req
    })
});


