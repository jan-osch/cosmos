"use strict";

const AuthActions = require('../actions/auth.actions');

function authMiddleware(req, res, next) {
    const token = extractToken(req);
    if (!token) {
        return res.status(401)
            .json({error: 'Bearer token is missing'})
    }

    AuthActions.getBearer(token)
        .then(user=> {
            req.user = user;
            next();
        })
        .catch(e=> {
            return res.status(401)
                .json({error: e})
        })
}

/**
 * @param {express.request} req
 * @returns {String|undefined} - token from header, if it exists
 */
function extractToken(req) {
    const rawHeader = req.get('Authorization');
    if (!rawHeader) return;

    return rawHeader.split('Bearer ')[1];
}

module.exports = {
    authMiddleware: authMiddleware
};

