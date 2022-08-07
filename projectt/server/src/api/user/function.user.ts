import { Request, Response, NextFunction, RequestHandler } from 'express';
import { param, body } from 'express-validator';
import * as pg from '../../lib.pool';
import { getDefaultUser, User } from '../../../../models/user.model';
import *  as bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { generateInserteQuery } from '../../lib.sqlUtils';
import * as multer from 'multer';
// import { signInUser } from '../auth/function.auths';
//import * as fs from 'fs'; 
//import {UploadedFile} from 'express-fileupload';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }

});

/**
 * app.post("/upload", function(req, res, fields) {

  const storage = multer.diskStorage({
    destination: "public/data/",
    filename: function(req, file, cb){
      crypto.randomBytes(20, (err, buf) => {
        cb(null, buf.toString("hex") + path.extname(file.originalname))
      })
    }
  });

  const upload = multer({
    storage: storage
  }).fields([{name: "pp"}, {name: "banner"}]);

  upload(req, res, (err) => {
    if (err) throw err;
  });

});
 */

// export const upload = multer({dest:'uploads/'});
export const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 1024 } });
export const getByUser: RequestHandler[] = [
  param('key').optional().isString(),
  param('value').optional(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result: User[] = [];
      result = await getBy(req.params.key, req.params.value);
      res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'faild' });

    }
  }
];


export const postUser: RequestHandler[] = [
  body('fname').exists().bail().isString(),
  body('lname').exists().bail().isString(),
  body('user_name').exists().bail().isString(),
  body('address').exists().bail().isString(),
  body('phone_number').exists().bail().isString(),
  body('email').exists().bail().isString(),
  body('password').exists().bail().isString(),
  body('sec_question').exists().bail().isString(),
  //body('photo').exists().bail().isString(),
  //upload.single('photo'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //console.log(req.file);
      const newUser: User = req.body;
      // newUser.photo=req.file.path;
      newUser.photo = 'profile';
      const user = await getBy('email', newUser.email);
      if (user.length >= 1) {
        return res.status(409).json({ message: 'Mail  already  exists' });
      }
      else {
        //const path = await uploadPhoto(req,res,next);
        //newUser.photo= path;
        const result = await createUser(newUser);
        res.status(StatusCodes.OK).json({ code: StatusCodes.OK, data: result, message: 'successfuly' });

      }

    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: {}, message: '', error: 'failed' });
    }
  }
];

const createUser = async (user: User) => {
  const password = await bcrypt.hash(user.password ? user.password : user.email, 10);
  user.password = password;
  const query = generateInserteQuery(`public."user"`, getDefaultUser(), user, true, true);
  const result = (await pg.db.query<User>(query.text, query.values)).rows[0];
  return result;
}

const getBy = async (key?: string, value?: string): Promise<User[]> => {
  let Users: User[];
  if ((!key && value) || (key && !value)) throw new Error('Invalid Argumemts');
  let query = `SELECT * FROM public."user"`;
  const queryValues: any[] = [];
  if (key && value && Object.keys(getDefaultUser()).includes(key.trim())) {
    query += ` WHERE "${key.trim()}"=$1`;
    queryValues.push(value);
  }
  query += ' ;';
  Users = (await pg.db.query<User>(query, queryValues)).rows;
  return Users;
}