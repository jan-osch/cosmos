import {TaskPrototype} from "../models/task-prototype";
import {ITaskPrototype} from "../interfaces/models";
import {validateId} from "../util/validators";

export function createNewTaskPrototypeAction(task:ITaskPrototype):Promise<string> {
    const taskPrototype = new TaskPrototype(task);

    return taskPrototype
        .save()
        .then(() => taskPrototype._id);
}

export function deleteTaskPrototypeAction(taskId:string):Promise<any> {
    return Promise.resolve()
        .then(()=>validateId(taskId))
        .then(()=>TaskPrototype.remove({_id: taskId}));
}

export function updateTaskPrototypeAction(params:{taskId:string, task:ITaskPrototype}):Promise<ITaskPrototype> {
    return Promise.resolve()
        .then(()=>validateId(params.taskId))
        .then(()=>TaskPrototype.findOneAndUpdate({_id: params.taskId}, {$set: params.task}))

}

export function getTaskPrototype(params:{taskId:string}):Promise<ITaskPrototype> {
    return Promise.resolve()
        .then(()=>validateId(params.taskId))
        .then(()=>TaskPrototype.findOne({_id: params.taskId}));
}

export function getAllTaskPrototypes() {
    return TaskPrototype.find({});
}

