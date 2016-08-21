"use strict";

const mongoose = require('mongoose');
const userEmailValidator = require('./user.model').userEmailValidator;

const SessionSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required : true,
        validate: userEmailValidator
    }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = {
    Session: Session,
    SessionSchema: SessionSchema
};
