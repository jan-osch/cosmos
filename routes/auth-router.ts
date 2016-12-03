import {Router} from "express";
import {registerUserAction, loginUserAction} from "../services/session-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {Session} from "../models/session";

export const AuthRouter = Router();

AuthRouter.post('/register', (req, res)=> {

    return registerUserAction(req.body.name, req.body.password, req.body.email)
        .then((token:string)=> {
            res
                .status(201)
                .json({token: token});
        })
        .catch(e=> {
            res
                .status(400)
                .json({error: e});
        });
});

AuthRouter.post('/login', (req, res)=> {
    return loginUserAction(req.body.email, req.body.password)
        .then((token:string)=> {
            res
                .status(200)
                .json({token: token})
        })
        .catch(e=> {
            res
                .status(400)
                .json({error: e})
        });
});

AuthRouter.use('/logout', authMiddleware);

AuthRouter.get('/logout', (req, res)=> {
    return Session.remove({email: req.user.email})
        .then(status => {
            if (status.n !== 1) {
                console.warn(`Invalid state: ${req.user.email} had more than one session: ${status.n}`);
            }
            res
                .status(200)
                .json({status: 'OK'});
        })
        .catch(e => res.status(500).json({error: e}));
});