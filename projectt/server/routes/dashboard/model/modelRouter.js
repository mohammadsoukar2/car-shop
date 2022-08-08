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

    model.createModeul(req.body).then((data) => {
        req.flash('success', 'Model added Successfully');
        res.redirect('back');
    }).catch((error) => {
        req.flash('error', 'Something went wrong !');
        res.redirect('back');
    });

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
        req.flash("success","Model was removed successfully");
        res.redirect('back');
    }).catch((error) => {
        if (error.code == '23503') {
            req.flash("error", "Wrong ! , The model may has parts or cars");
        } else {
            req.flash("error", "Something went wrong !");

        }
        res.redirect('back');


    });

});

router.post('/:id/update', (req, res) => {

    //* return the edit model page of dashboard

   /*  model.update('id', req.params.id).then((data) => {
        console.log(data);

        res.render('model/edit', { model: data[0] });
    }).catch((error) => { res.status(404).send(error) });
 */
    reqModel = req.body;
    reqModel.id=req.params.id;
    model.updateModel(reqModel).then(
        (data)=>{
            req.flash("success","Model updated successfully");
            res.redirect('back');
        }
    ).catch((error)=>{
        console.log(error);
        req.flash("error","Something went wrong");
            res.redirect('back');
    });

});

module.exports = router