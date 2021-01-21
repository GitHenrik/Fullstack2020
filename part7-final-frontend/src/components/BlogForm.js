import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogForm = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      <h3>Blogs</h3>
      {blogs.map(blog => {
        return <Blog key={blog.id} blog={blog} />
      })}
    </div>
  )
}

export default BlogForm