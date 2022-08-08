import { Request, Response, NextFunction, RequestHandler } from "express";
import { body } from "express-validator";
import { StatusCodes as HttpStatus } from "http-status-codes";
import { Jwt } from '../../../../models/jwt.model';
import * as bcrypt from 'bcrypt';
import * as pg from '../../lib.pool';
import { generateAuthToken } from "../../lib.auth";
// import {createHttpError} from 'http-errors';
import createHttpError = require('http-errors');
import { setting } from "../../../../setting/settings";

import * as store from "../store/function.store";
import * as agency from "../agency/function.agency";



export const signInUser = async (googleUser: boolean, email: string, password?: string) => {
	const query = `SELECT u.* from public."user" u where lower(u."email") = lower($1)`;
	const pgUser = (await pg.db.query(query, [email])).rows;
	if (pgUser <= 0) throw new createHttpError.NotFound('user not found!');
	else if (pgUser > 1) throw new createHttpError.Conflict('duplicate users found in pg');
	else if (!!password && !bcrypt.compareSync(password, pgUser[0].password)) throw new createHttpError.NotFound('user name/password error!');
	return pgUser[0];
}

export const signInAdmin = async (googleUser: boolean, email: string, password?: string) => {
	const query = `SELECT u.* from public."user" u where lower(u."email") = lower($1)`;
	const pgUser = (await pg.db.query(query, [email])).rows;
	if (pgUser <= 0) return false;
	else if (pgUser > 1) false;
	else if (!!password && !bcrypt.compareSync(password, pgUser[0].password)) throw new createHttpError.NotFound('user name/password error!');
	return pgUser[0];
}

export const logInUser: RequestHandler[] = [
	body('email').isString().bail().exists(),
	body('password').isString().bail().exists(),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body;
			const user = await signInUser(false, payload.email, payload.password);
			user.password = "";
			if (user.isRejected) {
				throw new createHttpError.Unauthorized('User is Rejected Please Contact System Administrator.');
			}

			var userStore, hasStore = false, store_id = '';
			userStore = await store.getBy('user_id', user.id);

			if (userStore.length > 0) {
				hasStore = true;
				store_id = userStore[0].id;
			}

			var userAgency, hasAgency = false, agency_id = '';
			userAgency = await agency.getBy('user_id', user.id);

			if (userAgency.length > 0) {
				hasAgency = true;
				agency_id = userAgency[0].id;
			}

			const jwt: Jwt = {
				uid: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin || false,
				hasStore: hasStore,
				hasAgency: hasAgency,
				store_id: store_id,
				agency_id: agency_id,
				tokenLife: +setting.jwtTokenLifeTime,
				actorType: 'user'
			}
			const jwtToken = generateAuthToken(jwt);

			res.status(HttpStatus.OK).json({ code: HttpStatus.OK, token: jwtToken, message: 'success' });
		} catch (error) {
			console.error(error);
			//res.status( err.status ).json( { code: err.status, data: {}, message: '', error: err.message || 'error' } as ApiResponse<{}> );

		}
	}
];


export const logInAdmin: RequestHandler[] = [
	body('email').isString().bail().exists(),
	body('password').isString().bail().exists(),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body;
			const user = await signInAdmin(false, payload.email, payload.password);
			if (!user) {
				res.render('login', { layout: false , error: "User Not Found" });
			}
			user.password = "";
			if (user.isRejected) {
				throw new createHttpError.Unauthorized('User is Rejected Please Contact System Administrator.');
			}



			var userStore, hasStore = false, store_id = '';
			userStore = await store.getBy('user_id', user.id);

			if (userStore.length > 0) {
				hasStore = true;
				store_id = userStore[0].id;
			}

			var userAgency, hasAgency = false, agency_id = '';
			userAgency = await agency.getBy('user_id', user.id);

			if (userAgency.length > 0) {
				hasAgency = true;
				agency_id = userAgency[0].id;
			}
			

			const jwt: Jwt = {
				uid: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin || false,
				hasStore: hasStore,
				hasAgency: hasAgency,
				store_id: store_id,
				agency_id: agency_id,
				tokenLife: +setting.jwtTokenLifeTime,
				actorType: 'user'
			}
			const jwtToken = generateAuthToken(jwt);

			//res.status(HttpStatus.OK).json({ code: HttpStatus.OK, token: jwtToken, message: 'success' });
			req.session.token = jwtToken;

			if (!user.isAdmin && !hasAgency && !hasStore) {
				res.status(403).send("403 FORBIDDEN");
			}

			req.flash("success", "Welcome ..");
			res.redirect('/dashboard');

		} catch (error) {
			console.log(error);
			//res.status( err.status ).json( { code: err.status, data: {}, message: '', error: err.message || 'error' } as ApiResponse<{}> );

		}
	}
];

export const checkVerifiedUser = async (email: string, password?: string) => {
	const pgUser = (await pg.db.query(`SELECT u.* from public."user" u where lower(u."email")= lower ($1)`, [email])).rows;
	if (pgUser.length <= 0) throw new createHttpError.NotFound('user not found!');
	else if (pgUser > 1) throw new createHttpError.Conflict('duplicate users found in pg');
	if (!!password && !bcrypt.compareSync(password, pgUser[0].password)) throw new createHttpError.NotFound('user name/password error!');
	return pgUser[0];
}


export const checkVerified: RequestHandler[] = [
	body('email').isString().bail().exists(),
	body('password').isString().bail().exists(),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body;
			const user = await checkVerifiedUser(payload.email, payload.password);
			user.password = "";
			var userStore, hasStore = false, store_id = '';
			userStore = await store.getBy('user_id', user.id);

			if (userStore.length > 0) {
				hasStore = true;
				store_id = userStore[0].id;
			}

			var userAgency, hasAgency = false, agency_id = '';
			userAgency = await agency.getBy('user_id', user.id);

			if (userAgency.length > 0) {
				hasAgency = true;
				agency_id = userAgency[0].id;
			}

			const jwt: Jwt = {
				uid: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin || false,
				hasStore: hasStore,
				hasAgency: hasAgency,
				store_id: store_id,
				agency_id: agency_id,
				tokenLife: +setting.jwtTokenLifeTime,
				actorType: 'user'
			}
			const jwtToken = generateAuthToken(jwt);

			res.status(HttpStatus.OK).json({
				code: HttpStatus.OK, data: { token: jwtToken }, message: 'success'
			});
		}
		catch (error) {
			//res.status( err.status ).json( { code: err.status, data: {}, message: '', error: err.message || 'error' } as ApiResponse<{}> );
			console.error(error);
		}
	}
];
