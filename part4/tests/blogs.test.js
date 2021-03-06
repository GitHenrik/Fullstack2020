const listHelper = require('../utils/listHelper')

const manyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id:
      '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10, __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
// course task 4.3
describe('dummy test to start with', () => {
  test('returns one', () => {
    const result = listHelper.dummy(manyBlogs)
    expect(result).toBe(1)
  })
})

// course task 4.4
describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyList = []
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
  test('of a single blog equals the likes of that', () => {
    const singleBlog = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      }
    ]
    const result = listHelper.totalLikes(singleBlog)
    expect(result).toBe(7)
  })
  test('of a bigger list is calculated', () => {
    const result = listHelper.totalLikes(manyBlogs)
    expect(result).toBe(36)
  })
})

//course task 4.5*
describe('Favorite blog', () => {
  test('Returns the info on most liked blog', () => {
    const result = listHelper.favoriteBlog(manyBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

//course task 4.6*
describe('Most blogs', () => {
  test('Author of the most blogs and their amount', () => {
    const result = listHelper.mostBlogs(manyBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

//course task 4.7*
describe('Most likes', () => {
  test('Most liked author data', () => {
    const result = listHelper.mostLikes(manyBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})