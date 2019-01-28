const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')

const initialUser = [
    {
      username: 'Galaca',
      name: 'Galaca',
      over18: true,
      password: 123
    }]

beforeEach(async () => {
    await User.remove({})
  
    let userObject = new User(initialUser[0])
    await userObject.save()
  })

 test('User POST request', async () => {
    const newUser = {
      username: 'Testimies',
      name: 'Testi Mies',
      over18: true,
      password: '123'
      }
      
      const response = await api
        .post('/api/users')
        .send(newUser)

        const response2 = await api
        .get('/api/users')
        
    const contents = response.body.username
    const contents2 = response2.body.map(r => r.name)
    expect(contents).toContain('Testimies')
    expect(contents2).toContain('Testi Mies')
  })
  
  test('User rejection handling for invalid password and reserved username', async () => {
    const newUserInvalidPassword = {
      username: 'Testimies',
      name: 'Testi Mies',
      over18: true,
      password: '12'
      }
      
    const newUserReservedUsername = {
        username: 'Galaca',
        name: 'Gala Ca',
        over18: true,
        password: '123'
        }

    

            
      const responseInvalidPassword = await api
        .post('/api/users')
        .send(newUserInvalidPassword)

      const responseReservedUsername = await api .post('/api/users') .send(newUserReservedUsername)


    expect (responseInvalidPassword.text).toContain('Password needs to contain 3 or more characters.')
    expect (responseReservedUsername.text).toContain('Username already exists in the database. Provide a different username.')
    
   
  })

  
  test('Empty over18 field should default to true', async () => {

    const newUserUndefinedOver18 = {
        username: 'Testipeto',
        name: 'Pe To',
        password: '123'
        }
                
      const responseUndefinedOver18 = await api
        .post('/api/users')
        .send(newUserUndefinedOver18)
        
        expect (responseUndefinedOver18.body.over18).toBe(true)
  })

  afterAll(() => {
    server.close()
  })


