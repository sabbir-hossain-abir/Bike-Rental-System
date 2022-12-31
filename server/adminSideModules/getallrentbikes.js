const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Rentbike = require('../models/rentbikeSchema');

module.exports = router.get('/getAvailableRentBikes', async (req, res) =>{
    const allRentBikes = await Rentbike.find();

    try{
        
        res.status(200).send(allRentBikes);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});