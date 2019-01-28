const listHelper = require('../utils/list_helper')

describe('blog with more likes', () => {
    const listWithTwoBlogs = [
        {
            title: 'Kuinka tykitellään',
            author: 'Seppo ja Blaerah',
            likes: 666
        },
        {
            title: 'Kuinka koodata parhaimmillaan keskinkertaista koodia',
            author: 'Galaca',
            likes: 0
        }
    ]
    
    const expectedBlogCompare = 
        {
            title: 'Kuinka tykitellään',
            author: 'Seppo ja Blaerah',
            likes: 666
        }
    
    test('when two blogs are compared, the one with higher likes count is returned', () => {
        const result = listHelper.favoriteBlog(listWithTwoBlogs)
        expect(result).toEqual(expectedBlogCompare)
      })
    })