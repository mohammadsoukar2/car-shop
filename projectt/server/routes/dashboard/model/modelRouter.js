// * start of the router 

const express = require('express');

const model = require('../../../src/api/modeul/function.modeul');

const router = express.Router()



router.get('/', (req, res) => {

    //* return the model page of dashboard
    model.getModels().then((data) => {

        res.render('model/index', { models: data });
    });
});

router.get('/create', (req, res) => {

    //* return the model page of dashboard

    res.render('model/create');

});



module.exports = router