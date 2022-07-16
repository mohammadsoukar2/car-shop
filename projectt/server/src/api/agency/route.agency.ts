import {Router} from 'express';
import { postAgency,getByAgency} from './function.agency';

export const  agencyRoute :Router =Router();
agencyRoute.route('/agency/:key?/:value?').get(getByAgency);
agencyRoute.route('/agency/').post(postAgency);

