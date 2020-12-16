const express = require('express')

const postRoutes = express.Router()

// import controller methods
const { create, list, read, update, remove } = require('../controllers/post')


// route
postRoutes.post('/post', create);
postRoutes.get('/posts', list);
postRoutes.get('/post/:slug', read); //req.params.slug
postRoutes.put('/post/:slug', update);
postRoutes.delete('/post/:slug', remove);



module.exports = postRoutes;