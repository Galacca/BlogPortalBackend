const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  over18: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
  return ({
    username: user.username,
    id: user.id,
    name: user.name,
    over18: user.over18,
    blogs: user.blogs
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User