
const express = require('express');
const { route } = require('./dashboardRouter');
const user = require('../../src/api/auth/function.auths');
const router = express.Router()

router.get('/dashboard/login', (req, res) => {
    res.render('login', { layout: false });
});

router.post('/dashboard/login', user.logInAdmin);


module.exports = router;