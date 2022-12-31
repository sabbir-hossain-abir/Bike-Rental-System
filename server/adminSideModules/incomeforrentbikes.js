const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Rentbikeincomes = require('../models/rentBikeIncomeSchema');

module.exports = router.get('/getrentbikeincome', async (req, res) =>{
    const allIncomes = await Rentbikeincomes.find();

    console.log(allIncomes);
    try{
        
        res.status(200).send(allIncomes);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});
