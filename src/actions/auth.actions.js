"use strict";

const crypto = require('crypto');
const User = require('../models/user.model').User;
const Session = require('../models/session.model').Session;

/**
 * Adds new User and performs login for the new account
 *
 * @param {String} name
 * @param {String} rawPassword
 * @param {String} email
 * @returns {Promise<String>} - promise of session token
 */
function registerUserAction(name, rawPassword, email) {
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
function createPasswordHash(password) {
    return crypto.createHash('sha256')
        .update(password)
        .digest('hex');
}

/**
 * @param {String} email
 * @param {String} rawPassword
 * @returns {Promise<String>} - Promise of session token
 */
function loginUserAction(email, rawPassword) {
    return logoutUserAction(email)
        .then(()=> {
            return User.findOne({email: email}, {password: 1})
        })
        .then(user=> {
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

/**
 * Retrieves token owner
 *
 * @param {String} token
 * @returns {Promise<User>}
 */
function getTokenBearer(token) {
    return Session.findOne({_id: token})
        .exec()
        .then(session=> {
            if (!session) throw new Error('Provided token does not exist');

            return session;
        })
}

/**
 * Destroys user session
 *
 * @param {String} email
 * @returns {Promise}
 */
function logoutUserAction(email) {
    return Session
        .remove({email: email})
        .exec();
}

module.exports = {
    register: registerUserAction,
    logout: logoutUserAction,
    login: loginUserAction,
    getBearer: getTokenBearer
};