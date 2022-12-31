const express = require('express');
const router = express.Router();

const authenticate = require("../middelware/authenticate");

const User = require('../models/userSchema');

module.exports = router.post('/contact', authenticate, async (req, res) =>{
    try {
        // console.log(req) 
        const { name, email, phone, message } = req.body;
       

        if(!name || !email || !phone || !message){

            return res.json({error: "Please fill the form"})
        }

        const userContact = await User.findOne({_id: req.userID});
    

        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, message);
            
            await userContact.save();

            res.status(201).json({message: "user contact successfull"});
        }

    } catch (error) {
        console.log(error)  
    }
});