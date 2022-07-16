import {Router} from 'express';

import { postCar,getByCar, getCarsCount } from './function.car';

export const carRoute : Router = Router();



carRoute.route('/cars/count').get(getCarsCount);
carRoute.route('/car/:key?/:value?').get(getByCar);
carRoute.route('/car/').post(postCar);
