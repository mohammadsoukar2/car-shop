import * as express from 'express';

import { cors } from './lib.cors';

import * as createError from 'http-errors';

import { StatusCodes } from 'http-status-codes';

import { HttpError } from 'http-errors';

import { Request, Response, Nextfunction } from 'express';

// import {authRoute } from './api/auth/route.auths';
import { carRoute } from './api/car/route.car';
import { modeulRoute } from './api/modeul/route.modeul';
import { agencyRoute } from './api/agency/route.agency';
import { partRoute } from './api/part/route.part';
import { storeRoute } from './api/store/route.store'
import { userRoute } from './api/user/route.user';
import { dashboardRoute } from './api/dashboard/route.dashboard';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as flash from 'connect-flash';
import { stringify } from 'querystring';
//& --------------------------------------Express Handlebar ---------------------------------------
const expresshbs = require('express-handlebars');

var express_handlebars_sections = require('express-handlebars-sections');

//& -------------------------------------App ----------------------------------------
const app = express();

app.use(express.urlencoded());

//&--------------------------------------Session & Cookie-----------------------------------------

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());
app.use(flash());
//& ------------------------------------Add Static Path for assets------------------------

app.use(express.static(__dirname));


//& ---------------------------------------View Engine ---------------------------------

app.engine('hbs', expresshbs.engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        // 👇 Importantly, define the helper as a regular `function`, _not_ an arrow-function.
        section: express_handlebars_sections(),
        ifCond: (v1, operator, v2, options) => {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        },
        asset: (file) => {
            return app.locals.baseUrl + file;
        },
        decoder: (images) => {
                

            return stringify(images);
        },
        firstImage: (images) => {
            try {
                // var imgs = JSON.parse(images);

                return app.locals.baseUrl + '/' + images[0];
            } catch (e) { }
            return '';

        },
        route: (path) => {
            return app.locals.baseUrl + path;
        }
    }
}));


//& ---------------------------------------SET View Engine ---------------------------------

app.set("view engine", 'hbs');


//&---------------------------------------Import dashboard routes ---------------------------

const dashboard = require('../routes/dashboard/dashboardRouter');
const loginRouter = require('../routes/dashboard/loginRouter');

//&-------------------------------------Dashboard route ---------------------------------

app.use('/dashboard', dashboard);

//& ----------------------------------End of dashboard route -----------------------------
app.use(cors);

app.use(express.json({ limit: 100 * 1024 * 1024 }));

app.locals.baseUrl = 'http://127.0.0.1:3000';


// app.use('/auth',authRoute);
app.use(carRoute);

app.use(modeulRoute);

app.use(agencyRoute);

app.use(partRoute);

app.use(storeRoute);

app.use(userRoute);

app.use(dashboardRoute);

app.use(loginRouter);

app.use(() => {
    throw createError(StatusCodes.NOT_IMPLEMENTED, 'NOT IMPLEMENTED');
})

app.use((error: HttpError, _req: Request, res: Response, next: Nextfunction) => {
    console.log(error);

    const code = StatusCodes.INTERNAL_SERVER_ERROR || error.statuscode;
    const message = code === StatusCodes.INTERNAL_SERVER_ERROR || error.message;


    res.status(code).json({
        code,
        data: { error: error.error },
        message: message,
        error: error.message || message,

    });
});


// START  EXPRESS  SERVER 
app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
});