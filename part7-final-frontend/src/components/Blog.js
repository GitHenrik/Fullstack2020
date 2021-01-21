import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div id='entire-blog' style={blogStyle}>
      <div id='minimized-blog' className='title-author-test'>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by  {blog.author}</Link><br />
      </div>
    </div>
  )
}

export default Blog
