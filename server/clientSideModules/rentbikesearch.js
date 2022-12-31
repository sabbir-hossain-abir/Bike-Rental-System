const express = require('express');
const router = express.Router();

const Rentbike = require('../models/rentbikeSchema');

let getRentSearch;
  
    module.exports =  router.post('/searchRentBike', async (req, res)=>{
        const getText = req.body.searchText
        const x = getText
        console.log(x)
        const searchCategory = await Rentbike.find({$text: {$search: x}});
    
        getRentSearch = searchCategory
        
        return res.status(201).send(searchCategory);
        
    }),

    module.exports =  router.get('/rentbikesearchCategory', async (req, res) =>{
    
        try{
            
            res.status(200).send(getRentSearch);
    
        }catch(error) {
            res.status(400).send(error.message);
        }
    
        
    });
    