import { Request, Response, NextFunction, RequestHandler } from 'express';
import { param, body } from 'express-validator';
import * as pg from '../../lib.pool';
import { StatusCodes } from 'http-status-codes';
import { generateInserteQuery, generateUpdateQuery } from '../../lib.sqlUtils';
import { Modeul, getDefaultModeul } from '../../../../models/modeul.model';



export const getModeulCount: RequestHandler[] = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result = 0;
            result = await getCount();
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

        }
    }
];

export const getByModeul: RequestHandler[] = [
    param('key').optional().isString(),
    param('value').optional(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: Modeul[] = [];
            result = await getBy(req.params.key, req.params.value);
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

        }
    }
];


export const postModeul: RequestHandler[] = [
    body('make').exists().bail().isString(),
    body('model_name').exists().bail().isString(),
    body('type').exists().bail().isString(),
    body('fuel').exists().bail().isString(),
    body('transmission').exists().bail().isString(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: Modeul = req.body;
            // const store = await getBy('email',payload.email);
            // if( store.length == 0 )
            // {
            const result = await createModeul(payload);
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

            // }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'failed' });
        }


    }]




export const createModeul = async (modeul: Modeul) => {
    const query = generateInserteQuery(`public."model"`, getDefaultModeul(), modeul, true, true);
    const result = (await pg.db.query<Modeul>(query.text, query.values)).rows[0];

    return result;
}


export const getBy = async (key?: string, value?: string): Promise<Modeul[]> => {

    let modeuls: Modeul[];
    if ((key && !value) || (key && !value)) throw new Error('invalid arguments');
    let query = `SELECT * FROM public."model"`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultModeul()).includes(key.trim())) {
        query += ` WHERE "${key.trim()}"= $1`;
        queryValues.push(value);
    }
    query += ';';
    modeuls = (await pg.db.query<Modeul>(query, queryValues)).rows;
    return modeuls;
}

export const deleteM = async (key?: string, value?: string): Promise<Modeul[]> => {

    let modeuls: Modeul[];
    if ((key && !value) || (key && !value)) throw new Error('invalid arguments');
    let query = `delete FROM public."model"`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultModeul()).includes(key.trim())) {
        query += ` WHERE "${key.trim()}"= $1`;
        queryValues.push(value);
    }
    query += ';';
    modeuls = (await pg.db.query<Modeul>(query, queryValues));
    return modeuls;
}



export const update = async (key?: string, value?: string): Promise<Modeul[]> => {

    let modeuls: Modeul[];
    if ((key && !value) || (key && !value)) throw new Error('invalid arguments');
    let query = `SELECT * FROM public."model"`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultModeul()).includes(key.trim())) {
        query += ` WHERE "${key.trim()}"= $1`;
        queryValues.push(value);
    }
    query += ';';
    modeuls = (await pg.db.query<Modeul>(query, queryValues)).rows;
    return modeuls;
}

export const getModels = async (key?: string, value?: string): Promise<Modeul[]> => {

    let modeuls: Modeul[];
    if ((key && !value) || (key && !value)) throw new Error('invalid arguments');
    let query = `SELECT * FROM public."model"`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultModeul()).includes(key.trim())) {
        query += ` WHERE "${key.trim()}"= $1`;
        queryValues.push(value);
    }
    query += ';';
    modeuls = (await pg.db.query<Modeul>(query, queryValues)).rows;
    return modeuls;
}

const getCount = async () => {
    let query = `SELECT COUNT(*) FROM public."model"`;
    return (await pg.db.query<Modeul>(query)).rows;
}



export const updateModel = async (modeul: Modeul) => {
    const query = generateUpdateQuery(`public."model"`, getDefaultModeul(), modeul, true);
    query.text += `WHERE id =$${++query.paramCounter}`;
    query.values.push(modeul.id);
    const result = (await pg.db.query<Modeul>(query.text, query.values)).rows[0];
    return result;
}
