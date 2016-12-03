import {Router, Request, Response} from "express";
import {authorizeUser} from "../middlewares/auth-middleware";
import * as TemplateService from "../services/template-service";
import {Template} from "../models/template";

export const TemplateRouter = Router();

TemplateRouter.use(authorizeUser);


TemplateRouter.get('/new', function (req, res) {
    res.render('template/new', {
        title: 'New Task Template',
        task: new Template(),
        isNew: true
    });
});


TemplateRouter.post('/new', (req, res)=> {
    console.log(req.body);
    const newTask = req.body;
    newTask.author = req.user._id;

    return TemplateService.createAction(newTask)
        .then(taskId=> res.redirect(taskId))
        .catch(err => {
            const errors = Object.keys(err.errors).map(field => err.errors[field].message);

            return res.render('template/new', {
                title: 'New Task Template',
                task: req.body,
                isNew: true,
                errors,
            });
        })
});

TemplateRouter.get('/:id', (req, res, next)=> {

    return TemplateService.getOne({taskId: req.params.id})
        .then(template => {
            if (!template) {
                return res
                    .status(404)
                    .json({error: 'Task not found'})
            }

            return template.populate('author')
        })
        .then(template => {
            res.render('template/show', {
                title: template.title,
                task: template
            });
        })
        .catch(next);
});

TemplateRouter.get('/:id/edit', (req, res, next)=> {

    return TemplateService.getOne({taskId: req.params.id})
        .then(template => {
            if (!template) {
                return res
                    .status(404)
                    .json({error: 'Task not found'})
            }

            return template
        })
        .then(template => {
            res.render('template/edit', {
                title: template.title,
                task: template,
                isNew: false,
            });
        })
        .catch(next);
});

TemplateRouter.put('/:id', (req, res, next)=> {
    return TemplateService.updateAction({taskId: req.params.id, task: req.body})
        .then(task => {
            if (!task) {
                return res
                    .status(404)
                    .json({error: 'Task not found'})
            }


            return res.redirect(task._id);
        })
        .catch(next);
});

TemplateRouter.delete('/:id', (req, res, next)=> {
    return TemplateService.deleteAction(req.params.id)
        .then(number => res.redirect('/'))
        .catch(next);
});
