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


    res.render('model/create');

});

router.post('/store', (req, res) => {

    console.log(req.body);
    model.createModeul(req.body).then((data) => {
        console.log(data);
        res.redirect('back');
    }).catch((error) => res.send(error));

});
router.get('/:id/edit', (req, res) => {

    //* return the edit model page of dashboard

    model.getBy('id', req.params.id).then((data) => {
        console.log(data);

        res.render('model/edit', { model: data[0] });
    }).catch((error) => { res.status(404).send(error) });

});

router.post('/:id/destroy', (req, res) => {

    //* return the edit model page of dashboard

    model.deleteM('id', req.params.id).then((data) => {
        console.log(data);
        res.redirect('back');
    }).catch((error) => { res.status(404).send(error) });

});

router.get('/:id/update', (req, res) => {

    //* return the edit model page of dashboard

    model.update('id', req.params.id).then((data) => {
        console.log(data);

        res.render('model/edit', { model: data[0] });
    }).catch((error) => { res.status(404).send(error) });

});

module.exports = router