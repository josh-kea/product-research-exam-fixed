const express = require('express')

const postRoutes = express.Router()

// import controller methods
const { create, list, read, update, remove } = require('../controllers/post')
const { requireSignin } = require('../controllers/auth');


// route
postRoutes.post('/post', requireSignin, create);
postRoutes.get('/posts', list);
postRoutes.get('/post/:slug', read); //req.params.slug
postRoutes.put('/post/:slug', requireSignin, update);
postRoutes.delete('/post/:slug', requireSignin, remove);



module.exports = postRoutes;