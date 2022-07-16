import {Router} from 'express';
import { postUser,getByUser } from './function.user';
import { logInUser } from '../auth/function.auths';
export const userRoute:Router = Router();

userRoute.route('/user/:key?/:value?').get(getByUser);
userRoute.route('/user/signin').post(postUser);
userRoute.route('/user/login').post(logInUser);
