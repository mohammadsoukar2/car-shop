// * start of the router 


const express = require('express') 
const part=require('../../../src/api/part/function.part');
const router = express.Router() 

  
    router.get('/', (req, res) => {
        
        //* return the part page of dashboard
        part.getBy().then((data)=>{
            res.render('part/index',{parts:data}); 
        });    
        
    
    });

    router.get('/create', (req, res) => {
        
        //* return the part page of dashboard

        res.render('part/create'); 
    
    });



module.exports = router