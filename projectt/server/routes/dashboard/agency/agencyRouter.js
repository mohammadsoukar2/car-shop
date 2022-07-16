// * start of the router 


const express = require('express') 

const router = express.Router() 

  
    router.get('/', (req, res) => {
        
        //* return the agency page of dashboard

        res.render('agency/index'); 
    
    });

    router.get('/create', (req, res) => {
        
        //* return the agency page of dashboard

        res.render('agency/create'); 
    
    });



module.exports = router