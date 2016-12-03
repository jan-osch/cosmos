import * as crypto from "crypto";
import {User} from "../models/user";
import {Session} from "../models/session";
import {IUser, ISession} from "../interfaces/models";


export function registerUserAction(name:string, rawPassword:string, email:string):Promise {
    return Promise.resolve()
        .then(()=> {
            if (!rawPassword) throw new Error('Password is not specified');

            const passwordHash = createPasswordHash(rawPassword);

            const user = new User({
                name: name,
                password: passwordHash,
                email: email
            });

            return user.save()
        })
        .then(()=>loginUserAction(email, rawPassword))
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

