// * start of the router 


const express = require('express')

const car = require('../../../src/api/car/function.car');

const router = express.Router()


const model = require('../../../src/api/modeul/function.modeul');


router.get('/', (req, res) => {

    //* return the car page of dashboard
    if (res.locals.user.hasAgency) {
        car.getBy('agency_id', res.locals.user.agencyId).then((data) => {
            console.log(data);
            res.render('car/index', { cars: data });
        });
    } else if (res.locals.user.isAdmin) {
        car.getBy().then((data) => {
            console.log(data);
            res.render('car/index', { cars: data });
        });
    }
});

router.get('/create', (req, res) => {
    var user = res.locals.user;
    if (!user.hasAgency) {
        res.status(403).send("403 FORBIDDEN");
    }
    //* return the car page of dashboard
    model.getBy().then((data) => {
        res.render('car/create', { models: data });
    });
});

router.post('/store', car.upload.array('images[]', 4), (req, res, next) => {
    var user = res.locals.user;

    if (!user.hasAgency) {
        res.status(403).send("403 FORBIDDEN");
    }
    //* return the car page of dashboard
    reqCar = req.body;
    reqCar.agency_id = user.agencyId;
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


router.post('/:id/update', car.upload.array('images[]', 4), (req, res) => {



    reqCar = req.body;
    var hasImages=false;
    if (req.files) {
        reqCar.images = [];
        for (file of req.files) {
            hasImages=true;
            reqCar.images.push(file.path);
        };
    }
   reqCar.id = req.params.id;
   console.log(reqCar);
    car.updateCar(reqCar,hasImages).then(() => {
        req.flash("success", "Car updated successfully");
        res.redirect('back');
    }).catch(() => {
        req.flash("error", "Something went wrong !");
        res.redirect('back');
    });



});

router.post('/:id/destroy', (req, res) => {

    //* return the edit model page of dashboard

    car.removeCar({ id: req.params.id }).then((data) => {
        req.flash("success", "Cars wwas removed successfully")
        res.redirect('back');
    }).catch((error) => {
        req.flash("error", "Something went wrong !");
        res.redirect('back');
    });

});


module.exports = router