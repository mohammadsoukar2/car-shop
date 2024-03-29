import { Request, Response, NextFunction, RequestHandler } from 'express';
import { param, body } from 'express-validator';
import * as pg from '../../lib.pool';
import { getDefaultPart, Part } from '../../../../models/part.module';
import { StatusCodes } from 'http-status-codes';
import { generateDeleteQuery, generateInserteQuery, generateUpdateQuery } from '../../lib.sqlUtils';
import * as multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/part');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 1024 } });
export const getByPart: RequestHandler[] = [
    param('key').optional().isString(),
    param('value').optional(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: Part[] = [];
            result = await getBy(req.params.key, req.params.value);
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

        }
    }
];




export const postPart: RequestHandler[] = [
    body('name').exists().bail().isString(),
    body('year').exists().bail().isString(),
    body('model_id').exists().bail().isString(),
    body('store_id').exists().bail().isString(),
    //body('photo').exists().bail().isString(),
    upload.single('photo'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //console.log(req.file);
            const newPart: Part = req.body;
            newPart.photo = req.file.path;

            const result = await createPart(newPart);
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });



        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'failed' });
        }
    }
];
export const createPart = async (part: Part) => {
    const query = generateInserteQuery(`public."part"`, getDefaultPart(), part, true, true);
    const result = (await pg.db.query<Part>(query.text, query.values)).rows[0];
    return result;
}


export const storePart = async (req, res) => {

    const newPart: Part = req.body;
    newPart.store_id = res.locals.user.storeId;
    newPart.photo = '' + req.file.path;
    const query = generateInserteQuery(`public."part"`, getDefaultPart(), newPart, true, true);
    const result = (await pg.db.query<Part>(query.text, query.values)).rows[0];
    return result;
};

export const getBy = async (key?: string, value?: string): Promise<Part[]> => {
    let parts: Part[];
    if ((!key && value) || (key && !value)) throw new Error('Invalid Argumemts');
    let query = `SELECT p.* ,s.name as store_name,m.make,m.model_name FROM public."part" as p join public."model" as m on p.model_id=m.id join public."store" as s on p.store_id=s.id`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultPart()).includes(key.trim())) {
        query += ` WHERE p."${key.trim()}"=$1`;
        queryValues.push(value);
    }
    query += ' ;';
    parts = (await pg.db.query<Part>(query, queryValues)).rows;
    return parts;
}


export const updatePart = async (part: Part, hasPhoto: boolean) => {

    const query = generateUpdateQuery(`public."part"`, getDefaultPart(), part, true, hasPhoto);
    query.text += `WHERE id =$${++query.paramCounter}`;
    query.values.push(part.id);
    const result = (await pg.db.query<Part>(query.text, query.values)).rows[0];
    return result;
}

export const removePart = async (part: Part) => {
    const query = generateDeleteQuery(`public."part"`, { id: part.id });
    const result = (await pg.db.query<Part>(query.text, query.values)).rows[0];
    return result;
}

export const deleteParts = async (key?: string, value?: string): Promise<Part[]> => {

    let modeuls: Part[];
    if ((key && !value) || (key && !value)) throw new Error('invalid arguments');
    let query = `delete FROM public."part"`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultPart()).includes(key.trim())) {
        query += ` WHERE "${key.trim()}"= $1`;
        queryValues.push(value);
    }
    query += ';';
    modeuls = (await pg.db.query<Part>(query, queryValues));
    return modeuls;
}