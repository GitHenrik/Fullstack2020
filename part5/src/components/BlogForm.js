import React from 'react'
import Blog from './Blog'

const BlogForm = props => {
    return (
      <div>
        <h3>Blogs</h3>
        {props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  export default BlogForm