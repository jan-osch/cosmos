import {Router} from "express";
import {registerUserAction, loginUserAction} from "../services/session-service";
import {Session} from "../models/session";

export const AuthRouter = Router();

AuthRouter.post('/register', (req, res)=> {
    return registerUserAction(req.body)
        .then((token:string)=> {
            res
                .cookie('Authorization', `Bearer ${token}`)
                .redirect('/');
        })
        .catch(err=> {
            const errors = Object.keys(err.errors).map(field => err.errors[field].message);

            res.render('users/signup', {
                title: 'Sign up',
                user: req.body,
                errors,
            });
        });
});

AuthRouter.post('/login', (req, res)=> {
    return loginUserAction(req.body.email, req.body.password)
        .then((token:string)=> {
            res
                .cookie('Authorization', `Bearer ${token}`)
                .redirect('/');
        })
        .catch(e=> {
            res
                .redirect('/login');
        });
});

AuthRouter.get('/logout', (req, res)=> {
    return Session.remove({email: req.user.email})
        .then(status => {
            if (status.n !== 1) {
                console.warn(`Invalid state: ${req.user.email} had more than one session: ${status.n}`);
            }
            res
                .clearCookie('Authorization')
                .redirect('/');
        })
        .catch(e => res.status(500).json({error: e.toString()}));
});