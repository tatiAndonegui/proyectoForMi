const express = require('express');
const { createUser, loginUser } = require('../db/connection');
const router = express.Router();

router.post("/auth/register", async (req, res) => {
   const { name, lastName, email, password } = req.body;

   createUser({ name, lastName, email, password }, function (error) {
        if(!error) {
            return res.status(201).send({ name, lastName, email });
        }

        return res.status(500).send("Ocurrio un error al crear el usuario");
   });
})

router.post("/auth/login", async (req, res) => {
    const {email, password } = req.body;

    loginUser({ email, password }, function (error, result) {
         if(!error && result.length) {
             return res.status(201).send(result[0]);
         }
 
         return res.status(401).send("Usuario o contraseña incorrectos");
    });
 })


module.exports=router;