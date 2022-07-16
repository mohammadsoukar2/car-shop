import {Router} from 'express';

import {getCounts} from './function.dashboard';

export const dashboardRoute:Router=Router();

dashboardRoute.route('/index/dashboard/counts').get(getCounts);

