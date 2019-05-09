const adder = (accumulator, currentValue) => accumulator + currentValue
const maxCallback = ( acc, cur ) => Math.max( acc, cur )

const dummy = (blogs) => {
  return blogs.reduce(adder, 1)
}

const totalLikes = (blogs) => {
  const mapped = blogs.map(blogit => { return blogit.likes })
  return Number(mapped)
}

const favoriteBlog = (blogs) => {
  const mapped2 = blogs.map(blogia => { return blogia.likes } )
  return blogs.find( blog => blog.likes === mapped2.reduce(maxCallback))
}

//TODO: Do this in a less...creative way. When I did this my attitude was "Can it be done like this?"
const mostBlogs = (blogs) => {

  let comparisonArray = [
    {
      author: null,
      blogs: 0
    }
  ]

  blogs.forEach(element => {
    const comparisonMappedAuthor = comparisonArray.map(compare => {
      return compare.author
    })

    if(comparisonMappedAuthor.includes(element.author))
    {
      const target = comparisonArray.find( compare => compare.author === element.author )
      target.blogs = target.blogs + 1
    }
    else
    {
      const addObject = {
        author: element.author,
        blogs: 1
      }
      comparisonArray = comparisonArray.concat(addObject)
    }

  })

  const comparisonMap = comparisonArray.map(compa => { return Number(compa.blogs)} )
  return comparisonArray.find( blog => blog.blogs === comparisonMap.reduce(maxCallback))

}

const mostLikes = (blogs) => {
  let comparisonArray = [
    {
      author: null,
      likes: null
    }
  ]

  blogs.forEach(element => {
    const comparisonMappedAuthor = comparisonArray.map(compare => {
      return compare.author
    })

    if(comparisonMappedAuthor.includes(element.author))
    {
      const target = comparisonArray.find( compare => compare.author === element.author )
      target.likes = target.likes + element.likes
    }
    else
    {
      const addObject = {
        author: element.author,
        likes: element.likes
      }
      comparisonArray = comparisonArray.concat(addObject)
    }

  })

  const comparisonMap = comparisonArray.map(compa => { return Number(compa.likes) } )
  return comparisonArray.find( blog => blog.likes === comparisonMap.reduce(maxCallback))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
