const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");


//dashboard authentication
module.exports = router.get('/dashboard', (req, res) =>{

    res.send(req.rootAdmin);
})