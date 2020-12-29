import React from 'react'
import Blog from './Blog'

const BlogForm = ({blogs}) => {
    return (
      <div>
        <h3>Blogs</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  export default BlogForm