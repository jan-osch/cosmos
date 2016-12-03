import {User, createPasswordHash} from "../models/user";
import {Session} from "../models/session";
import {IUser, ISession} from "../interfaces/models";


export function registerUserAction(params:{name:string, password:string, email:string, username:string}):Promise {
    return Promise.resolve()
        .then(()=> new User(params).save())
        .then(()=>loginUserAction(params.email, params.password))
        .catch(err => {
            if (err.name === 'MongoError') {
                err.errors = {
                    email: {
                        message: 'Mail already exists'
                    }
                }
            }

            throw err;
        });
}

/**
 * @param {String} email
 * @param {String} rawPassword
 * @returns {Promise<String>} - Promise of session token
 */
export function loginUserAction(email, rawPassword):Promise<string> {
    const password = createPasswordHash(rawPassword);

    return logoutUserAction(email)
        .then(()=> User.findOne({email: email, password: password}, {_id: 1}))
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

