import { Request,Response,NextFunction ,RequestHandler} from 'express';
import {param , body } from 'express-validator';
import * as pg from '../../lib.pool';
import {getDefaultPart, Part} from '../../../../models/part.module';
import {StatusCodes} from 'http-status-codes';
import { generateInserteQuery } from '../../lib.sqlUtils';
import * as multer from 'multer';


const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'./uploads/part');
    },    
    filename : function (req,file,cb)
        {
            cb(null,file.originalname);
        }
});

export const upload = multer({storage : storage , limits:{ fileSize:1024*1024*1024}});
export const getByPart : RequestHandler []=[
 param('key').optional().isString(),
 param('value').optional(),
 async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let result : Part[]=[];
        result=await getBy(req.params.key,req.params.value);
        res.status(StatusCodes.OK).json({code:StatusCodes.OK,data:result,message:'successfuly'});

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:StatusCodes.INTERNAL_SERVER_ERROR,data:{},message:'',error:'faild'});

    }
 }
] ;



export const postPart : RequestHandler[]=[
    body('name').exists().bail().isString(),
    body('year').exists().bail().isString(),
    body('model_id').exists().bail().isString(),
    body('store_id').exists().bail().isString(),
    //body('photo').exists().bail().isString(),
    upload.single('photo'),
    async(req:Request,res:Response,next:NextFunction)=>{
        try {
              //console.log(req.file);
            const newPart : Part = req.body;
            newPart.photo=req.file.path;
           
                const result = await createPart(newPart);
                res.status(StatusCodes.OK).json({code:StatusCodes.OK,data:result,message:'successfuly'});
    
             
    
        } catch (error) {
           console.error(error); 
           res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:StatusCodes.INTERNAL_SERVER_ERROR,data:{},message:'',error:'failed'});  
        }
    }
    ];
const createPart =async (part:Part) => {
       const query = generateInserteQuery(`public."part"`,getDefaultPart(),part,true,true);
       const result =(await pg.db.query<Part>(query.text,query.values)).rows[0];
       return result;     
  }
  
 export const getBy = async( key?:string , value?:string) :Promise<Part[]> =>{
    let parts  : Part[];
     if((!key && value)|| (key && !value))throw new Error ('Invalid Argumemts');
     let query =`SELECT * FROM public."part"`;
     const queryValues : any[] =[];
     if(key && value && Object.keys(getDefaultPart()).includes(key.trim()))
     {
         query +=` WHERE "${key.trim()}"=$1`;
         queryValues.push(value);
     }
     query +=' ;';
     parts =(await pg.db.query<Part>(query,queryValues)).rows;
     return parts;
  }