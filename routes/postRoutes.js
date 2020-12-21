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

router.post('/posts/bulk', passport.authenticate('jwt'), (req, res) => {
  const posts = req.body.map(post => ({
    ...post,
    user: req.user._id
  }))

  Post.create(posts)
    .then(posts => {
      const postIds = posts.map(post => post._id)
      User.findById(req.user._id)
        .then(user => {
          const allPosts = [...user.posts, ...postIds]
          User.findByIdAndUpdate(req.user._id, { posts: allPosts })
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err))
        })
    })
})


module.exports = router
