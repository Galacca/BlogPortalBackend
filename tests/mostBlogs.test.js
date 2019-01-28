const listHelper = require('../utils/list_helper')

describe('author with most blogs', () => {
    const listWithThreeBlogs = [
        {
            author: 'Seppo ja Blaerah',
        },
        {
            author: 'Galaca',
        },
        {
            author: 'Seppo ja Blaerah',
        },
    ]

const expectedBlogMostBlogs =
{
    author: 'Seppo ja Blaerah',
    blogs: 2
}
    test('return the author with most blogs written', () => {
        const result = listHelper.mostBlogs(listWithThreeBlogs)
        expect(result).toEqual(expectedBlogMostBlogs)
    })
})