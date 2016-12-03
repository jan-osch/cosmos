import {Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";

export const ProfileRouter = Router();

ProfileRouter.use(authMiddleware);

ProfileRouter.get('/', (req, res)=> {
    res.json(req.user);
});