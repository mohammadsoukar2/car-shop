
import * as pg from '../../lib.pool';
import { Modeul } from '../../../../models/modeul.model';
import { Agency } from '../../../../models/agency.model';
import { Car } from '../../../../models/car.model';
import { Store } from '../../../../models/store.model';
import { Part } from '../../../../models/part.module';

/* 
export const getCounts: RequestHandler[] = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {


            var user;
            var decodedToken = jwt.verify(req.session.token, setting.setting.botJwtSecret);
            if (!decodedToken.isAdmin && !decodedToken.hasStore && decodedToken.hasAgency) {
                res.status(403).send("403 FORBIDDEN")
            } else {
                user = {
                    id: decodedToken.uid,
                    email: decodedToken.email,
                    isAdmin: decodedToken.isAdmin,
                    hasStore: decodedToken.hasStore,
                    hasAgency: decodedToken.hasAgency,
                    storeId: decodedToken.store_id,
                    agencyId: decodedToken.agency_id
                };


            }


            let modelsCount = 0;
            modelsCount = await getModelsCount();

            let carsCount = 0;
            if (user.hasAgency) {
                carsCount = await getCarsCount(user.agencyId);
            } else if (user.isAdmin) {

                carsCount = await getCarsCount(false);
            }
            var agencyCount = [{ count: 0 }];
            var storeCount = [{ count: 0 }];

            let partCount = [{ count: 0 }];

            if (user.isAdmin) {


                agencyCount = await getAgencyCount();


                storeCount = await getStoreCount();
            }

            if (user.hasStore) {
                partCount = await getPartCount(user.storeId);

            } else {
                partCount = await getPartCount(false);
            }

            let result = {
                cars: carsCount[0].count,
                stores: storeCount[0].count,
                agencies: agencyCount[0].count,
                models: modelsCount[0].count,
                parts: partCount[0].count
            };

            res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

        }
    }
]; */


export const getDashboardCounts = async (user) => {



    var stat = {
        models: 0,
        part: 0,
        car: 0,
        agency: 0,
        stores: 0
    };
    var models = await getModelsCount();
    var parts = await getPartCount(user);
    var cars = await getCarsCount(user);

    stat.part = parts[0].count;
    stat.car = cars[0].count;
    stat.models = models[0].count;

    if (user.isAdmin) {
        var agency = await getAgencyCount();
        var stores = await getStoreCount();
        stat.agency = agency[0].count;
        stat.stores = stores[0].count;

    }

    return stat;
};


const getModelsCount = async () => {
    let query = `SELECT COUNT(*) FROM public."model"`;
    return (await pg.db.query<Modeul>(query)).rows;
}

const getCarsCount = async (user) => {

    if (user.hasStore) {
        return [
            { count: 0 }
        ];
    }
    var agencyId = false;
    if (user.hasAgency) {
        agencyId = user.agencyId;
    }

    var queryValues: any[] = [];
    var query = `SELECT COUNT(*) FROM public."car"`;
    if (agencyId) {
        query += ' WHERE ' + '"agency_id"=$1';
        queryValues.push(agencyId);
        query += ';';

        console.log(query);
        return (await pg.db.query<Car>(query, queryValues)).rows;
    }

    console.log(query);
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


const getPartCount = async (user) => {

    if (user.hasAgency) {
        return [
            {
                count: '0'
            }
        ];
    }
    var storeId = false;
    if (user.hasStore) {
        storeId = user.storeId;
    }


    var queryValues: any[] = [];
    let query = `SELECT COUNT(*) FROM public."part"`;
    if (storeId) {
        query += ' WHERE ' + '"store_id"=$1';
        queryValues.push(storeId);
        query += ';';
        console.log(query);
        return (await pg.db.query<Part>(query, queryValues)).rows;
    }

    console.log(query);
    return (await pg.db.query<Part>(query)).rows;
}