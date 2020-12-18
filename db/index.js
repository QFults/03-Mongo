module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/blog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
