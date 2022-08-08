// * start of the router 


const express = require('express')

const router = express.Router()

const store = require('../../../src/api/store/function.store');

router.get('/', (req, res) => {
    if (!res.locals.user.isAdmin)
        res.status(403).send("403 FORBIDDEN");
    //* return the store page of dashboard
    store.getBy().then((data) => {
        res.render('store/index', { stores: data });
    }).catch((error) => {
        req.flash('error', 'Some thing went wrong');
        res.redirect('back');
    });

});




router.post('/:id/destroy', (req, res) => {

    //* return the edit model page of dashboard
    if (!res.locals.user.isAdmin)
        res.status(403).send("403 FORBIDDEN");
    store.removeStore({ id: req.params.id }).then((data) => {
        req.flash("success", "store was removed successfully")
        res.redirect('back');
    }).catch((error) => {
        console.log(error);
        req.flash("error", "Something went wrong !");
        res.redirect('back');
    });

});


module.exports = router