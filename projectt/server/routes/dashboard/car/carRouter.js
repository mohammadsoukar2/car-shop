// * start of the router 


const express = require('express') 

const router = express.Router() 

  
    router.get('/', (req, res) => {
        
        //* return the car page of dashboard

        res.render('car/index'); 
    
    });

    router.get('/create', (req, res) => {
        
        //* return the car page of dashboard

        res.render('car/create'); 
    
    });



module.exports = router