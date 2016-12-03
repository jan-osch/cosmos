/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response, Router} from "express";

export const IndexRouter = Router();

IndexRouter.get('/', function (req:Request, res:Response, next:Function) {
    res.render('index', {title: 'Cosmos'})
});


