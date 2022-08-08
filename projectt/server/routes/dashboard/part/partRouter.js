// * start of the router 


const express = require('express')
const part = require('../../../src/api/part/function.part');
const router = express.Router()
const model = require('../../../src/api/modeul/function.modeul');




router.get('/', (req, res) => {

    //* return the part page of dashboard
    if (res.locals.user.hasStore) {
        part.getBy('store_id', res.locals.user.storeId).then((data) => {
            res.render('part/index', { parts: data });
        });
    } else {
        part.getBy().then((data) => {
            res.render('part/index', { parts: data });
        });
    }


});

router.get('/create', (req, res) => {

    //* return the create part page of dashboard
    if (!res.locals.user.hasStore) {
        res.status(403).send("403 FORBIDDEN");
    }

    model.getBy().then((data) => {
        res.render('part/create', { models: data });
    });

});


router.post('/store', part.upload.single('image'), (req, res, next) => {
    if (!res.locals.user.hasStore) {
        res.status(403).send("403 FORBIDDEN");
    }
    part.storePart(req, res).then((data) => {
        req.flash("success", "Part added successfully");
        res.redirect('back');
    }).catch((error) => {
        req.flash("error", "Something went wrong !");
        res.redirect('back');
    });


});


router.post('/:id/update', part.upload.single('photo'), (req, res) => {



    reqPart = req.body;
    var hasPhoto = false;
    if (req.file) {

        reqPart.photo = req.file.path;
        if (reqPart.photo) {
            hasPhoto = true;
        }
    }
    reqPart.id = req.params.id;
    console.log(reqPart);
    part.updatePart(reqPart, hasPhoto).then(() => {
        req.flash("success", "Part updated successfully");
        res.redirect('back');
    }).catch((error) => {
        console.log(error);
        req.flash("error", "Something went wrong !");
        res.redirect('back');
    });



});


router.get('/:id/edit', (req, res) => {

    //* return the part page of dashboard
    model.getBy().then((models) => {
        part.getBy('id', req.params.id).then((data) => {
            console.log(data);
            res.render('part/edit', { part: data[0], models: models });
        }).catch((error) => {

            req.flash("error", "Something went wrong");
            res.redirect('back');
        });
    });



});

router.post('/:id/destroy', (req, res) => {

    //* return the edit model page of dashboard

    part.removePart({ id: req.params.id }).then((data) => {
        req.flash("success", "Cars wwas removed successfully")
        res.redirect('back');
    }).catch((error) => {
        req.flash("error", "Something went wrong !");
        res.redirect('back');
    });

});

module.exports = router