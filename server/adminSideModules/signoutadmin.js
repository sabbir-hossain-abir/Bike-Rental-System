const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");


module.exports = router.get('/adminsignout', (req, res)=>{
    console.log('user log out')
    res.clearCookie('jwtAdmin', {path: '/'})
    res.status(200).send("Admin Logout")
})
