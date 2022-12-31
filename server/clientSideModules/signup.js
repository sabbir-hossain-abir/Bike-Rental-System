const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');

//User Regestration 
module.exports = router.post('/signup', async (req, res) =>{
    const {name, phone, email, password, cPassword} = req.body;
    
    if(!name || !phone || !email || !password || !cPassword){
        return res.status(422).json({ error: "Please filled the form properly"})
    }

    try {
            const userExist = await User.findOne({ email: email});
            
            if(userExist){
                return res.status(422).json({error: "Please filled the form properly"})
            }
            else if(password != cPassword){
                return res.status(422).json({error: "Passowrds are not matching"})
            }
            else{
                const user = new User ({name, phone, email, password, cPassword});
    
                await user.save();

                res.status(201).json({ message: "user registered successfully"});
            }
    
        } catch (error) {
            console.log(error);
    }
});
