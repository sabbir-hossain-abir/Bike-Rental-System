const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const User = require('../models/userSchema');

module.exports = router.get('/getavailableusers', async (req, res) =>{
    const allUser = await User.find();

    try{
        
        res.status(200).send(allUser);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});