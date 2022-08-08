import { Request, Response, NextFunction, RequestHandler } from 'express';
import { param, body } from 'express-validator';
import * as pg from '../../lib.pool';
import { getDefaultAgency, Agency } from '../../../../models/agency.model';
import { StatusCodes } from 'http-status-codes';
import { generateDeleteQuery, generateInserteQuery } from '../../lib.sqlUtils';
import { decodeToken } from '../../lib.decodeJWT';

import { deleteCars } from '../car/function.car';

export const getByAgency: RequestHandler[] = [
    param('key').optional().isString(),
    param('value').optional(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: Agency[] = [];
            result = await getBy(req.params.key, req.params.value);
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

        }
    }
];
export const postAgency: RequestHandler[] = [
    body('name').exists().bail().isString(),
    body('email').exists().bail().isString(),
    body('facebook').exists().bail().isString(),
    body('location').exists().bail().isString(),
    body('user_id').exists().bail().isString(),
    decodeToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: Agency = req.body
            payload.user_id = req['currentUser'].uid;
            const store = await getBy('email', payload.email);
            if (store.length >= 1) {
                return res.status(409).json({ message: 'Mail  already  exists' });
            }
            else {

                const result = await createAgency(payload);
                res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'failed' });
        }

    }]

export const createAgency = async (agency: Agency) => {
    const query = generateInserteQuery(`public."agency"`, getDefaultAgency(), agency, true, true);
    const result = (await pg.db.query<Agency>(query.text, query.values)).rows[0];
    return result;
}
export const getBy = async (key?: string, value?: string): Promise<Agency[]> => {
    let agencies: Agency[];
    if ((key && !value) || (key && !value)) throw new Error('invalid arguments');
    let query = `SELECT * FROM public."agency"`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultAgency()).includes(key.trim())) {
        query += ` WHERE "${key.trim()}"= $1`;
        queryValues.push(value);
    }
    query += ';';
    agencies = (await pg.db.query<Agency>(query, queryValues)).rows;
    return agencies;
}


export const removeAgency = async (a: Agency) => {


    deleteCars('agency_id',a.id);
    const query = generateDeleteQuery(`public."agency"`, { id: a.id });
    const result = (await pg.db.query<Agency>(query.text, query.values)).rows[0];
    return result;


}