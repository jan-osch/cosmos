"use strict";

const mongoose = require('mongoose');

const userEmailValidator = {
    validator: validateEmail,
    message: 'Email must be a real email'
};

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: userEmailValidator
    }
});

/**
 * Validates string is a valid email
 *
 * @param {String} email
 * @returns {boolean}
 */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const User = mongoose.model('User', UserSchema);

module.exports = {
    User: User,
    UserSchema: UserSchema,
    userEmailValidator: userEmailValidator
};
