const express = require('express')

const router = express.Router()

// import controller methods
const { create, list, read, update, remove } = require('../controllers/post')


// route
router.post('/post', create);
router.get('/posts', list);
router.get('/post/:slug', read); //req.params.slug
router.put('/post/:slug', update);
router.delete('/post/:slug', remove);



module.exports = router;