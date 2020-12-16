const express = require('express')

const router = express.Router()

// import controller methods
const { create, list, read } = require('../controllers/post')


// route
router.post('/post', create);
router.get('/posts', list);
router.get('/post/:slug', read); //req.params.slug

module.exports = router;