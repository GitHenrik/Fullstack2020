import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogForm = ({ handleLike, handleDelete, user }) => {
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      <h3>Blogs</h3>
      {blogs.map(blog => {
        //check if the blog was created by the logged user, defining visibility of deletion button
        let loggedIn = user.username === blog.user.username
        return <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} loggedIn={loggedIn} />
      }

      )}
    </div>
  )
}

export default BlogForm