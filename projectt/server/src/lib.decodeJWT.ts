import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyAuthToken } from "./lib.auth";

export const decodeToken = async(req:Request,res:Response,next:NextFunction)=>{
   if(req.headers?.authorization)
   {
       const idToken = req.headers.authorization;
       try {
           const decodeToken = verifyAuthToken(idToken);
           if (decodeToken === null )
           {
               return res.status(StatusCodes.UNAUTHORIZED).json({error:'Unauthorized access!'});

           }
           req['currentUser']=decodeToken;
           //console.log( req['currentUser']);
       } catch (error) {
           console.error(error);
           next(error);
           return error;
       }
       next();
       return;
   } else {
       return res.status(StatusCodes.UNAUTHORIZED).json({error:'Unauthorized access!'})
   }
}