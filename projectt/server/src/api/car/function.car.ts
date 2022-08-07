import { Request, Response, NextFunction, RequestHandler } from 'express';
import { param, body } from 'express-validator';
import * as pg from '../../lib.pool';
import { getDefaultCar, Car } from '../../../../models/car.model';
import { StatusCodes } from 'http-status-codes';
import { generateInserteQuery } from '../../lib.sqlUtils';
import * as multer from 'multer';
//import * as fs from 'fs'; 
//import {UploadedFile} from 'express-fileupload';

//get Car
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/car/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});

export const getByCar: RequestHandler[] = [
    param('key').optional().isString(),
    param('value').optional(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: Car[] = [];
            result = await getBy(req.params.key, req.params.value);
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'fetched successfuly' });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

        }
    }
];


export const getCarsCount: RequestHandler[] = [

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result;
            result = await getCount();
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'fetched successfuly' });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

        }
    }
];
export const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 1024 } });
//    const uploadMultiple = upload.array('images',8);

export const postCar: RequestHandler[] = [
    body('color').exists().bail().isString(),
    body('doors').exists().bail().isString(),
    body('price').exists().bail().isString(),
    body('year').exists().bail().isString(),
    body('images').exists().bail().isArray(),
    upload.array('images', 8),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fs = require('fs');
            const mime = require('mime');
            const images = req.body.images;
            const photosPaths: any[] = [];
            for (const image of images) {
                let matches = image.name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                let response;

                if (matches.length !== 3) {
                    return new Error('Invalid input string');
                }

                response.type = matches[1];
                response.data = new Buffer(matches[2], 'base64');
                let decodedImg = response;
                let imageBuffer = decodedImg.data;
                let type = decodedImg.type;
                let extension = mime.extension(type);
                // let fileName = "image."+ extension;
                let fileName = image.name + extension;
                fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
                photosPaths.push(`./upload/car/${fileName}`);
            }
            const newCar: Car = req.body;
            newCar.images = photosPaths;

            const result = await createCar(newCar);
            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });



        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'failed' });
        }
    }
]


export const createCar = async (car: Car) => {

    const query = generateInserteQuery(`public."car"`, getDefaultCar(), car, true, true);
    const result = (await pg.db.query<Car>(query.text, query.values)).rows[0];
    return result;
}

export const getBy = async (key?: string, value?: string): Promise<Car[]> => {
    let Cars: Car[];
    if ((!key && value) || (key && !value)) throw new Error('Invalid Argumemts');
    let query = `SELECT c.* ,m.make,m.model_name FROM public."car" as c join public."model" as m on c.model_id=m.id`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultCar()).includes(key.trim())) {
        query += ` WHERE c.${key.trim()}=$1`;
        queryValues.push(value);
    }
    query += ' ;';
    console.log(query);
    Cars = (await pg.db.query<Car>(query, queryValues)).rows;
    return Cars;
}

const getCount = async () => {
    let query = `SELECT count(*) FROM public."car" `;
    return (await pg.db.query<Car>(query)).rows;
}

