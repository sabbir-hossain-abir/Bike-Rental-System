const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");

const User = require('../models/userSchema');
const Rentcart = require('../models/rentcartSchema');

module.exports = router.get('/getRentCartData', authenticate, async (req, res) =>{
    const findUser = await User.findOne({_id: req.userID});
    const findUserById = findUser._id;

    const cartData = await Rentcart.findOne({userById: findUserById});
    try{
        
        res.status(200).send(cartData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});