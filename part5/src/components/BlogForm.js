import React from 'react'
import Blog from './Blog'

const BlogForm = props => {
    return (
      <div>
        <h3>Blogs</h3>
        <div>
        <h4>User {props.username} has logged in</h4>
        <button onClick={props.handleLogout}>Logout</button>
        </div>
        {props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  export default BlogForm