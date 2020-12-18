const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    user: req.user._id
  })
    .then(post => {
      User.findByIdAndUpdate(post.user, { $push: { posts: post._id } })
        .then(() => res.json(post))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


module.exports = router
