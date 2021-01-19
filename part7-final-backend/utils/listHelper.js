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

//course task 4.6*
const mostBlogs = blogs => {
  if (blogs.length === 0)
    return 'given list was empty'
  //return value instantiation
  let authorData = { 'author': '', 'blogs': 0 }
  //remember authors and blog counts
  let blogCounts = new Map()
  //go through the blogs and update key-value pairs (author:blogs)
  //if there is no data, add the author name and blog value 1
  blogs.map(blog => {
    blogCounts.set(blog.author, blogCounts.get(blog.author) + 1 || 1)
    //if it was the highest number of blogs, update return data
    if (blogCounts.get(blog.author) > authorData.blogs) {
      authorData.author = blog.author
      authorData.blogs = blogCounts.get(blog.author)
    }
  })
  return authorData
}

//course task 4.7*
const mostLikes = blogs => {
  if (blogs.length === 0)
    return 'given list was empty'
  //instantiate return data
  let mostLikedData = { 'author': '', 'likes': -1 }
  //remember authors and their like counts
  let likeCounts = new Map()
  //iterate blogs and update like counts
  blogs.map(blog => {
    //update existing like count, or create new data with current like counts
    //console.log('for ', blog.author, ' doing this calculation: previously had ', likeCounts.get(blog.author), ' likes, and adding ', blog.likes, ' likes now')
    likeCounts.set(blog.author, likeCounts.get(blog.author) + blog.likes || blog.likes)
    //if the new like count is the highest, update return data
    if (likeCounts.get(blog.author) > mostLikedData.likes) {
      mostLikedData = { 'author': blog.author, 'likes': likeCounts.get(blog.author) }
      //mostLikedData.author = blog.author
      //mostLikedData.likes = likeCounts.get(blog.author)
    }
  })
  //console.log('final like data ', likeCounts)
  return mostLikedData
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}