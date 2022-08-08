import { Request,Response,NextFunction ,RequestHandler} from 'express';
import {param , body } from 'express-validator';
import * as pg from '../../lib.pool';
import {getDefaultStore, Store} from '../../../../models/store.model';
import {StatusCodes} from 'http-status-codes';
import { generateDeleteQuery, generateInserteQuery } from '../../lib.sqlUtils';
import { decodeToken } from '../../lib.decodeJWT';
import { deleteParts } from '../part/function.part';
// import { decodeToken } from '../../lib.decodeJWT';
//import { generateAuthToken, verifyAuthToken } from '../../lib.auth';

export const getByStore : RequestHandler []=[
    param('key').optional().isString(),
    param('value').optional(),
    async(req:Request,res:Response,next:NextFunction)=>{
       try {
           let result : Store[]=[];
           result=await getBy(req.params.key,req.params.value);
           res.status(StatusCodes.OK).json({code:StatusCodes.OK,data:result,message:'successfuly'});
   
       } catch (error) {
           console.error(error);
           res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:StatusCodes.INTERNAL_SERVER_ERROR,data:{},message:'',error:'faild'});
   
       }
    }
   ] ;

export const postStore :RequestHandler[]=[
    body('name').exists().bail().isString(),
    body('email').exists().bail().isString(),
    body('facebook').exists().bail().isString(),
    body('location').exists().bail().isString(),
    body('user_id').exists().bail().isString(),
    decodeToken,
    async(req:Request,res:Response,next:NextFunction)=>{
        try {
        const payload : Store = req.body
        payload.user_id=req['currentUser'].uid;
        const store = await getBy('email',payload.email);
        if(store.length >=1)
        {
            return res.status(409).json({message: 'Mail  already  exists'});
        }
       else
        {   
            
            const result = await createStore(payload);
            res.status(StatusCodes.OK).json({code:StatusCodes.OK,data:result,message:'successfuly'});

         } 
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:StatusCodes.INTERNAL_SERVER_ERROR,data:{},message:'',error:'failed'});
        }
        
    }
];

export const createStore= async(store:Store)=>{
    const query = generateInserteQuery(`public."store"`,getDefaultStore(),store,true,true) ;
    const result = (await pg.db.query<Store>(query.text,query.values)).rows[0];
      return result;
}
export const getBy = async( key?:string , value?:string) :Promise<Store[]> =>{
    let Stores  : Store[];
     if((!key && value)|| (key && !value))throw new Error ('Invalid Argumemts');
     let query =`SELECT * FROM public."store"`;
     const queryValues : any[] =[];
     if(key && value && Object.keys(getDefaultStore()).includes(key.trim()))
     {
         query +=` WHERE "${key.trim()}"=$1`;
         queryValues.push(value);
     }
     query +=' ;';
     Stores =(await pg.db.query<Store>(query,queryValues)).rows;
     return Stores;
  }


  
export const removeStore = async (a: Store) => {


    deleteParts('store_id',a.id);
    const query = generateDeleteQuery(`public."store"`, { id: a.id });
    const result = (await pg.db.query<Store>(query.text, query.values)).rows[0];
    return result;


}