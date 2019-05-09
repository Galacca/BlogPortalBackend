const listHelper = require('../utils/list_helper')

describe('blog with most likes', () => {
  const listWithTwoBlogs = [
    {
      author: 'Seppo ja Blaerah',
      likes: 333
    },
    {
      author: 'Galaca',
      likes: 1
    },
    {
      author: 'Seppo ja Blaerah',
      likes: 333
    },
  ]

  const expectedOutcome =
        {
          author: 'Seppo ja Blaerah',
          likes: 666
        }

  test('when blogs are compared the author with more likes and the total amount of likes is returned', () => {
    const result = listHelper.mostLikes(listWithTwoBlogs)
    expect(result).toEqual(expectedOutcome)
  })
})