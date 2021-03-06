const Post = require('../models/post.js');
const slugify = require('slugify');

exports.create = (req, res) => {
    // console.log(req.body)

    const { title, content, user } = req.body
    const slug = slugify(title)// My Post my-post

    console.log(title)
    console.log(content)
    console.log(user)

    switch(true) {
        case !title:
            return res.status(400).json({
                error: 'Title is required'
            })
        case !content:
            return res.status(400).json({
                error: 'Content is required'
            })
    }
    console.log(Post)
    
    
    Post.create({ title, content, user, slug }, (err, post) => {
        if(err){
            console.log(err)
            res.status(400).json({ error: 'Duplicate post. Try another title.'})
        }

        res.json(post);
    });
};

exports.list = (req, res) => {
    // console.log(req.body)
    Post.find({}, function(err, posts) {
        if (err) { 
            console.log(err) 
        }
        res.json(posts)
    }).sort({ createdAt: -1})
}

exports.read = (req, res) => {
    // const { slug } = req.params;
    const slug = req.params.slug;

    // console.log(req.params.slug);
    // console.log(req.body)
    Post.findOne({slug : slug}, function(err, post) {
        if (err) { 
            console.log(err) 
        }
        res.json(post);
    })
}


exports.update = (req, res) => {
    // const { slug } = req.params;
    const slug = req.params.slug;
    const { title, content, user } = req.body;

    Post.findOneAndUpdate({slug : slug}, { title, content, user }, { new: true }, function(err, post) {
        if (err) { 
            console.log(err) 
        }
        res.json(post);
    })
}

exports.remove = (req, res) => {
    // const { slug } = req.params;
    const slug = req.params.slug;

    // console.log(req.params.slug);
    // console.log(req.body)
    Post.findOneAndRemove({slug : slug}, function(err, post) {
        if (err) { 
            console.log(err) 
        }
        res.json(
            {
                message: 'Post removed'
            }
        );


    })
}