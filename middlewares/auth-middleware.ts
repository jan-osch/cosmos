import {getTokenBearer} from "../services/session-service";

export function authMiddleware(req, res, next) {
    const token = extractToken(req);
    if (!token) {
        return res
            .status(401)
            .json({error: 'Bearer token is missing'})
    }

    return getTokenBearer(token)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(e => {
            return res
                .status(401)
                .json({error: e.toString()})
        })
}

export function extractToken(req):string {
    const rawHeader = req.get('Authorization');
    if (!rawHeader) return;

    return rawHeader.split('Bearer ')[1];
}


