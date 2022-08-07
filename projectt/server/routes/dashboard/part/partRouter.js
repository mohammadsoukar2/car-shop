// * start of the router 


const express = require('express')
const part = require('../../../src/api/part/function.part');
const router = express.Router()
const model = require('../../../src/api/modeul/function.modeul');




router.get('/', (req, res) => {

    //* return the part page of dashboard
    part.getBy().then((data) => {
        res.render('part/index', { parts: data });
    });


});

router.get('/create', (req, res) => {

    //* return the part page of dashboard
    model.getBy().then((data) => {
        res.render('part/create', { models: data });
    });

});


router.post('/store', part.upload.single('image'), (req, res, next) => {
    part.storePart(req).then((data) => {
        console.log(data);
        res.redirect('back');
    }).catch((error) => res.send({mo:error}));


});

router.get('/:id/edit', (req, res) => {

    //* return the part page of dashboard

    part.getBy('id', req.params.id).then((data) => {
        console.log(data);
        res.render('part/edit', { part: data[0] });
    }).catch((error) => { res.status(404).send(error) });



});


module.exports = router