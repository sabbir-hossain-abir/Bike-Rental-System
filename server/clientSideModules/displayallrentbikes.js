const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");

const User = require('../models/userSchema');
const Rentbike = require('../models/rentbikeSchema');

module.exports = router.get('/getRentBikeData', authenticate, async (req, res) =>{
    const rentBikeData = await Rentbike.find();
    try{
        
        res.status(200).send(rentBikeData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});