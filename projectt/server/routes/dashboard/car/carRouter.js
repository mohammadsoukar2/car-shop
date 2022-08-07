// * start of the router 


const express = require('express')

const car = require('../../../src/api/car/function.car');

const router = express.Router()


const model = require('../../../src/api/modeul/function.modeul');


router.get('/', (req, res) => {

    //* return the car page of dashboard
    car.getBy().then((data) => {
        console.log(data);
        res.render('car/index', { cars: data });
    });
});

router.get('/create', (req, res) => {

    //* return the car page of dashboard
    model.getBy().then((data) => {
        res.render('car/create', { models: data });
    });
});

router.post('/store', car.upload.array('images[]', 4), (req, res, next) => {

    //* return the car page of dashboard
    reqCar = req.body;
    reqCar.agency_id = '79447652-0e4f-11ed-8b2f-74f06db73268';
    reqCar.images = [];
    for (file of req.files) {

        reqCar.images.push(file.path);
    };
    car.createCar(reqCar).then((data) => {
        req.flash("success", "new car added successfully")
        res.redirect('back');
    }).catch((error) => {
        req.flash("error", "Failed to add a new car")
        res.redirect('back');
    });
});


router.get('/:id/edit', (req, res) => {

    //* return the edit car page of dashboard
    model.getBy().then((models) => {
        car.getBy('id', '' + req.params.id).then((data) => {
            console.log(data);
            res.render('car/edit', { car: data[0], models: models });
        }).catch((error) => { res.status(404).send(error) });
    });
});

router.post('/:id/destroy', (req, res) => {

    //* return the edit model page of dashboard

    model.deleteM('id', req.params.id).then((data) => {
        console.log(data);
        res.redirect('back');
    }).catch((error) => { res.status(404).send(error) });

});


module.exports = router