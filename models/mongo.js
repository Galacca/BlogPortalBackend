const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = function(blog) {
  return ({
    title: blog.title,
    author: blog.number,
    url: blog.url,
    likes: blog.likes,
    id: blog._id,
    user: blog.user
  })
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog