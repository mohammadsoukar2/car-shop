// * start of the router 


const express = require('express') 

const router = express.Router() 

  
    router.get('/', (req, res) => {
        
        //* return the store page of dashboard

        res.render('store/index'); 
    
    });

    router.get('/create', (req, res) => {
        
        //* return the store page of dashboard

        res.render('store/create'); 
    
    });



module.exports = router