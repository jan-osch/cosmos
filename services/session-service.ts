import * as crypto from "crypto";
import {User} from "../models/user";
import {Session} from "../models/session";
import {IUser, ISession} from "../interfaces/models";


export function registerUserAction(params:{name:string, password:string, email:string, username:string}):Promise {
    return Promise.resolve()
        .then(()=> {
            if (!params.password) throw new Error('Password is not specified');

            const passwordHash = createPasswordHash(params.password);

            const user = new User({
                name: params.name,
                password: passwordHash,
                email: params.email,
                username: params.username
            });

            return user.save()
        })
        .then(()=>loginUserAction(params.email, params.password))
}

/**
 * @param {String} password
 * @returns {String}
 */
export function createPasswordHash(password):string {
    return crypto.createHash('sha256')
        .update(password)
        .digest('hex');
}

/**
 * @param {String} email
 * @param {String} rawPassword
 * @returns {Promise<String>} - Promise of session token
 */
export function loginUserAction(email, rawPassword):Promise<string> {
    return logoutUserAction(email)
        .then(()=> User.findOne({email: email}, {password: 1}))
        .then((user:IUser)=> {
            const passwordHash = createPasswordHash(rawPassword);
            if (user.password !== passwordHash) throw new Error('User password does not match');
        })
        .then(()=> {
            return new Session({email: email}).save();
        })
        .then(session=> {
            return session._id;
        })
}

export function getTokenBearer(token:string):Promise<IUser> {
    return Session.findOne({_id: token})
        .exec()
        .then((session:ISession)=> {
            if (!session) throw new Error('Provided token does not exist');

            return User.findOne({email: session.email});
        });
}


export function logoutUserAction(email) {
    return Session
        .remove({email: email})
        .exec();
}

