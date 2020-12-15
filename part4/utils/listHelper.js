const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0)
    return 0
  if (blogs.length === 1)
    return blogs[0].likes
  const reducer = (totalLikes, nextBlog) => totalLikes + nextBlog.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0)
    return 'given list was empty'
  let bestBlog = { 'title': '', 'author': '', 'likes': -1 }
  blogs.map(blog => {
    if (blog.likes > bestBlog.likes) {
      bestBlog.title = blog.title
      bestBlog.author = blog.author
      bestBlog.likes = blog.likes
    }
  })
  return bestBlog


}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}