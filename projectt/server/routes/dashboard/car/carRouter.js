// * start of the router 


const express = require('express') 

const car=require('../../../src/api/car/function.car');

const router = express.Router() 

  
    router.get('/', (req, res) => {
        
        //* return the car page of dashboard
        car.getBy().then((data)=>{
            console.log(data);
            res.render('car/index',{cars:data}); 
        });
    });

    router.get('/create', (req, res) => {
        
        //* return the car page of dashboard

        res.render('car/create'); 
    
    });



module.exports = router