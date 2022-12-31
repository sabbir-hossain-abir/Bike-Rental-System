const express = require('express');
const router = express.Router();

const authenticate = require("../middelware/authenticate");

// Sign Out implementation

module.exports = router.get('/signout', authenticate, (req, res)=>{
    console.log('user log out')
    
    res.clearCookie('jwtoken', {path: '/'})
    res.status(200).send("User Logout")
})