import {Router, Request, Response} from "express";
import {authorizeUser} from "../middlewares/auth-middleware";
import {
    getTaskPrototype,
    updateTaskPrototypeAction,
    deleteTaskPrototypeAction,
    createNewTaskPrototypeAction,
    getAllTaskPrototypes
} from "../services/task-prototype-service";

export const TaskPrototypeRouter = Router();

TaskPrototypeRouter.use(authorizeUser);

TaskPrototypeRouter.get('/prototype', (req, res, next)=> {
    return getAllTaskPrototypes()
        .then(results => res.json({result: results}))
        .catch(next);
});

TaskPrototypeRouter.get('/prototype/:id', (req, res, next)=> {
    return getTaskPrototype({taskId: req.params.id})
        .then(task => {

            if (!task) {
                return res
                    .status(404)
                    .json({error: 'Task not found'})
            }


            return res.json(task);
        })
        .catch(next);
});

TaskPrototypeRouter.put('/prototype/:id', (req, res, next)=> {
    return updateTaskPrototypeAction(req.params.id)
        .then(task => {
            if (!task) {
                return res
                    .status(404)
                    .json({error: 'Task not found'})
            }


            return req.json(task);
        })
        .catch(next);
});

TaskPrototypeRouter.delete('/prototype/:id', (req, res, next)=> {
    return deleteTaskPrototypeAction(req.params.id)
        .then(number => res.json({deleted: number}))
        .catch(next);
});

TaskPrototypeRouter.post('/prototype', (req, res)=> {
    const newTask = req.body;
    newTask.author = req.user._id;

    return createNewTaskPrototypeAction(newTask)
        .then(taskId=> res
            .status(201)
            .json({taskId: taskId})
        )
        .catch(e => res
            .status(400)
            .json({error: e.toString()}));
});