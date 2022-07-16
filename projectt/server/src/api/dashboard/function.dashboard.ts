import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as pg from '../../lib.pool';
import { StatusCodes } from 'http-status-codes';
import { Modeul } from '../../../../models/modeul.model';
import { Agency } from '../../../../models/agency.model';
import { Car } from '../../../../models/car.model';
import { Store } from '../../../../models/store.model';
import {Part} from '../../../../models/part.module';

export const getCounts: RequestHandler[] = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            let modelsCount = 0;
            modelsCount = await getModelsCount();

            let carsCount = 0;
            carsCount = await getCarsCount();

            let agencyCount = 0;

            agencyCount = await getAgencyCount();

            let storeCount = 0;

            storeCount = await getStoreCount();

            let partCount=0;

            partCount = await getPartCount();
            
            let result = {
                cars: carsCount[0].count,
                stores: storeCount[0].count,
                agencies: agencyCount[0].count,
                models: modelsCount[0].count,
                parts:partCount[0].count
            };

            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

        }
    }
];


const getModelsCount = async () => {
    let query = `SELECT COUNT(*) FROM public."model"`;
    return (await pg.db.query<Modeul>(query)).rows;
}

const getCarsCount = async () => {
    let query = `SELECT COUNT(*) FROM public."car"`;
    return (await pg.db.query<Car>(query)).rows;
}




const getAgencyCount = async () => {
    let query = `SELECT COUNT(*) FROM public."agency"`;
    return (await pg.db.query<Agency>(query)).rows;
}


const getStoreCount = async () => {
    let query = `SELECT COUNT(*) FROM public."store"`;
    return (await pg.db.query<Store>(query)).rows;
}


const getPartCount = async () => {
    let query = `SELECT COUNT(*) FROM public."part"`;
    return (await pg.db.query<Part>(query)).rows;
}