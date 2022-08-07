// * start of the router 


const express = require('express')
const agency = require('./../../../src/api/agency/function.agency')
const router = express.Router()


router.get('/', (req, res) => {

    //* return the agency page of dashboard
    agency.getBy().then((data) => {
        res.render('agency/index', { agencies: data });
    });

});

router.get('/create', (req, res) => {

    //* return the agency page of dashboard

    res.render('agency/create');

});




module.exports = router