import {getTokenBearer} from "../services/session-service";

const debug= require('debug')('cosmos:auth-middleware');

export function authorizeUser(req, res, next) {
    if (!req.user) {
        return res
            .status(401)
            .redirect('/login');
    }

    return next();
}

export function attachUser(req, res, next) {
    const token = extractToken(req);
    if (!token) {
        debug('authorization token not found');
        return next();
    }

    return getTokenBearer(token)
        .then(user => {
            req.user = user;
            return next();
        })
}

export function extractToken(req):string {
    const rawHeader = req.cookies.Authorization;
    debug(rawHeader);
    if (!rawHeader) return;

    return rawHeader.split('Bearer ')[1];
}




