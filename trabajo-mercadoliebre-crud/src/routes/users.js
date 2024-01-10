const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const usersController = require('../controllers/usersController');
const validateRegister = [
    check("nombre")
    .notEmpty().withMessage("Debe agregar un nombre"),
    
    check("apellido")
    .notEmpty().withMessage("Debe agregar un apellido"),

     
    check("telefono")
    .notEmpty().withMessage("Debe agregar un teléfono").bail()
    .isInt().withMessage("Debe ser un teléfono válido"),

    check("email")
    .notEmpty().withMessage("Debe agregar un mail").bail()
    .isEmail().withMessage("Debe ser un mail válido"),

    check("contraseña")
    .notEmpty().withMessage("Debe agregar una contraseña").bail()
    .isLength({min: 5, max: 10}).withMessage("La contraseña agregada debe ser de min 5 caracteres, y max 10 caracteres"),
];

router.get('/create', usersController.create); 
router.post('/create', validateRegister, usersController.store); 

module.exports = router;