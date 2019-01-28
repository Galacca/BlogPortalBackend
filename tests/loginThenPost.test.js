const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/mongo')
const User = require('../models/user')
require('express')

test('Login and post', async () => {
    const login = {
        username: 'Testipeto',
        password: '123'
      }

    const user = await User.findOne({ 'username': 'Testipeto' }, 'username')
    const userId = user._id

    const loginResponse = await api
        .post('/api/login')       
        .send(login)
    
    //console.log(loginResponse.body)    
       
    const testBlog = {
       
        title: 'Tämä on Login ja POST testi',
        author: 'Testimies',
        url: 'morjensta',
        userId: userId
      }

      
      //console.log(testBlog.Authorization)
        await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + loginResponse.body.token)
        .send(testBlog)
        .expect(200)
  })

  afterAll(() => {
    server.close()
  })
  