const express=require('express');
const publicRoute =express.Router();
const path = require('path');

publicRoute.use(express.urlencoded({ extended: true }));

publicRoute.get("/", (req, res) => {
   res.sendFile(path.join(__dirname,'../views/index.html'))
})


module.exports=publicRoute;