const blogsRouter = require('express').Router()
const Blog = require('../models/mongo.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id,
    user: blog.user
  }
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}) 
    .populate('blogs', { title: 1, url: 1})
    response.json(blogs.map(formatBlog))
  })

blogsRouter.get('/:id', async (request, response) => {
   const blogs = await Blog.findById(request.params.id)
   response.json(blogs.map(formatBlog)) 
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { "_id" : request.params.id },
      { "likes" : request.body.likes },
      { new : true })
    const savedBlog = await blog.save()
    response.json(formatBlog(savedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'Malformatted id.' })
  }
})

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      const blog = await Blog.findById(request.params.id)
      const user = await User.findById(decodedToken.id)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token is missing or invalid.' })
    }
    
    if ( blog.user.toString() != user._id.toString() )
      {return response.status(401).json({ error: 'Blog creator and user ID mismatch.' })}
      else{
      await Blog.findOneAndDelete({ "_id" : request.params.id })
      response.status(204).end()
      }
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'Malformatted id.' })
    }
  })

blogsRouter.post('/', async (request, response) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token is missing or invalid.' })
    }

      const body = request.body
      if (body.title === undefined) {
        return response.status(400).json({ error: 'Title is missing' })
      } else if (body.author === undefined) {
        return response.status(400).json({ error: 'Author is missing' })
      } else if (body.url === undefined) {
        return response.status(400).json({ error: 'URL is missing' })
      } else if (body.likes === undefined) {
        body.likes = 0
      }
    
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(formatBlog(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'Something went very very wrong.' })
    }
  }
  })

module.exports = blogsRouter

