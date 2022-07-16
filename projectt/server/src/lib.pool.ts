import {Pool} from 'pg';
import {setting} from '../../setting/settings'
export const db = new Pool({...setting.postgre});