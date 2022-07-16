import {Router} from 'express';

import { postPart,getByPart } from './function.part';

export const partRoute : Router = Router()

partRoute.route('/part/:key?/:value?').get(getByPart);
partRoute.route('part/').post(postPart);
