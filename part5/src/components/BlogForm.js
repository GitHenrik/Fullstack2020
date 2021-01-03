import React from 'react'
import Blog from './Blog'

const BlogForm = ({blogs, handleLike, handleDelete}) => {
    return (
      <div>
        <h3>Blogs</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
        )}
      </div>
    )
  }

  export default BlogForm