import {Router} from 'express';
import { postStore,getByStore } from './function.store';

export const  storeRoute :Router =Router();
storeRoute.route('/store/:key?/:value?').get(getByStore);
storeRoute.route('/store').post(postStore);
