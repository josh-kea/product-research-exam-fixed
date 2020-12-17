const express = require('express')

const authRoutes = express.Router()

// import controller methods
const { login } = require('../controllers/auth')


// route
authRoutes.post('/login', login);



module.exports = authRoutes;