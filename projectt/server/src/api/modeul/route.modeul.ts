import {Router} from 'express';

import { postModeul,getByModeul ,getModeulCount} from './function.modeul';

export const modeulRoute:Router=Router();

modeulRoute.route('/models/count').get(getModeulCount);
modeulRoute.route('/model/:key?/:value?').get(getByModeul);
modeulRoute.route('/model/').post(postModeul);
