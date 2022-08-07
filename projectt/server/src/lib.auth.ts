import * as jwt from 'jsonwebtoken';
import { User } from '../../models/user.model';
import { setting } from '../../setting/settings';

const secret = setting.botJwtSecret;
const tokenLifeSpan = setting.jwtTokenLifeTime;


export const generateAuthToken=(payload : any) =>{
    return jwt.sign(payload,secret,{
        expiresIn:`${tokenLifeSpan}d`,
        algorithm:`HS256`
    });
}

export const verifyAuthToken = (idToken: string)=>{
    try {
        return <User> jwt.verify(idToken,secret);
    } catch (error) {
        console.error(error);
        return null;
    }
}

// export const verifyAuthToken = async(req : Request,res:Response,next:NextFunction)=>{
//     try {
//          const decoded = jwt.verify(req.body.token , secret);
//          req.userData = decoded;
//          next();
//     } catch (error) {
//         return  res.status(401).json({
//             message:'Auth failed'
//         });
//     }
// }