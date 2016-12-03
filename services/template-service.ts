import {Template} from "../models/template";
import {ITemplate} from "../interfaces/models";
import {validateId} from "../util/validators";

export function createAction(task:ITemplate):Promise<string> {
    const taskPrototype = new Template(task);

    return taskPrototype
        .save()
        .then(() => taskPrototype._id);
}

export function deleteAction(taskId:string):Promise<any> {
    return Promise.resolve()
        .then(()=>validateId(taskId))
        .then(()=>Template.remove({_id: taskId}));
}

export function updateAction(params:{taskId:string, task:ITemplate}):Promise<ITemplate> {
    return Promise.resolve()
        .then(()=>validateId(params.taskId))
        .then(()=>Template.findOneAndUpdate({_id: params.taskId}, {$set: params.task}))

}

export function getOne(params:{taskId:string}):Promise<ITemplate> {
    return Promise.resolve()
        .then(()=>validateId(params.taskId))
        .then(()=>Template.findOne({_id: params.taskId}));
}

export function getAll(params:{limit:number, offset:number}) {
    return Template.find({}).skip(params.offset).limit(params.limit).exec();
}

export function countAll(params:{}):Promise<number> {
    return Template.count();
}