// * start of the router 


const express = require('express') 

const router = express.Router() 

  
    router.get('/', (req, res) => {
        
        //* return the part page of dashboard

        res.render('part/index'); 
    
    });

    router.get('/create', (req, res) => {
        
        //* return the part page of dashboard

        res.render('part/create'); 
    
    });



module.exports = router