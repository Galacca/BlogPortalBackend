const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/mongo')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Kuinka tykitellään',
      author: 'Seppo ja Blaerah',
      url: 'wat',
      likes: 666,
    },
    {
        title: 'Kuinka koodataan sekavaa koodia',
        author: 'Galaca',
        url: 'lolwut',
        likes: 1,
    }
  ]

  beforeEach(async () => {
    await Blog.remove({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })
  

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('Kuinka tykitellään')
  })

  
  test('POST-request', async () => {
    const user = await User.findOne({ 'username': 'Galaca' }, 'username')
    const userId = user._id
    const newBlog = {
        title: 'Tämä on POST testi',
        author: 'Testauksen SUPERAGENTTI',
        url: 'blanko',
        userId: userId
      }
      
      const response = await api
        .post('/api/blogs')
        .send(newBlog)

        const response2 = await api
        .get('/api/blogs')
        
    const contents = response.body.title
    const contents2 = response2.body.map(r => r.author)
    expect(contents).toContain('Tämä on POST testi')
    expect(contents2).toContain('Testauksen SUPERAGENTTI')
  })
    
    test('DELETE /api/blogs/:id', async () => {

        const newBlog = {
            title: 'Tämä on DELETE testi',
            author: 'Testauksen SUPERAGENTTI',
            url: 'huspois',
          }

        const response = await api
        .post('/api/blogs')
        .send(newBlog)
        console.log(response.body.id)
        await api
        .delete(`/api/blogs/${response.body.id}`)
        //console.log(await api .get('/api/blogs'))
        .expect(204)
    })

    test('PUT /api/blogs/:id', async () => {

        const newBlog = {
            title: 'Tämä on PUT testi',
            author: 'Testauksen SUPERAGENTTI',
            url: 'putteri',
            likes: 1200
          }

        const updateBlog = {
           likes: 12 
          }

        const response1 = await api
        .post('/api/blogs')
        .send(newBlog)
        const response2 = await api
        .put(`/api/blogs/${response1.body.id}`)
        .send(updateBlog)
        expect(response2.body.likes).toBe(12)
    })

  test('POST request - Rejection handling', async () => {
    const newBlogNoTitle = {
        author: 'Testauksen SUPERAGENTTI',
        url: 'blanko',
        likes: 4800
      }

      const newBlogNoUrl = {
        title: 'Tämä on POST testi',
        author: 'Testauksen SUPERAGENTTI',
        likes: 4800
      }

      const newBlogNoAuthor = {
        title: 'Tämä on POST testi',
        url: 'blanko',
        likes: 4800
      }

      const response1 = await api
        .post('/api/blogs')
        .send(newBlogNoTitle)

        const response2 = await api
        .post('/api/blogs')
        .send(newBlogNoUrl)

        const response3 = await api
        .post('/api/blogs')
        .send(newBlogNoAuthor)
        
    expect(response1.text).toContain('Title is missing')
    expect(response2.text).toContain('URL is missing')
    expect(response3.text).toContain('Author is missing')
  })

afterAll(() => {
  server.close()
})



