// * start of the router 


const express = require('express')
const agency = require('./../../../src/api/agency/function.agency')
const router = express.Router()


router.get('/', (req, res) => {

    //* return the agency page of dashboard
    if (!res.locals.user.isAdmin)
        res.status(403).send("403 FORBIDDEN");
    agency.getBy().then((data) => {
        res.render('agency/index', { agencies: data });
    });

});



router.post('/:id/destroy', (req, res) => {

    //* return the edit model page of dashboard
    if (!res.locals.user.isAdmin)
        res.status(403).send("403 FORBIDDEN");
    agency.removeAgency({ id: req.params.id }).then((data) => {
        req.flash("success", "Cars wwas removed successfully")
        res.redirect('back');
    }).catch((error) => {
        console.log(error);
        req.flash("error", "Something went wrong !");
        res.redirect('back');
    });

});


module.exports = router