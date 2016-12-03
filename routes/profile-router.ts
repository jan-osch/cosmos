import {Router} from "express";
import {authorizeUser} from "../middlewares/auth-middleware";

export const ProfileRouter = Router();

ProfileRouter.use(authorizeUser);

ProfileRouter.get('/', (req, res)=> {
    res.json(req.user);
});