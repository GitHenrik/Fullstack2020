import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleUserPage = ({ handleLike, handleDelete, user }) => {
  const id = useParams().id // hook has to be called outside the filter function
  const blog = useSelector(state => state.blogs.filter(b => b.id === id))
  if (!blog[0]) {
    return null
  }

  let loggedIn = user.username === blog[0].user.username
  const showWhenLoggedIn = { display: loggedIn ? '' : 'none' }

  return (
    <div>
      <h1>{blog[0].title} by {blog[0].author}</h1>
      <div>
        <a href={blog[0].url}>{blog[0].url}</a>
      </div>
      <div>
        {blog[0].likes} likes  <button id='like-button' onClick={() => handleLike(blog[0])}>Like</button>
      </div>
      <div>
        Blog added by {blog[0].user.name} <button id='delete-blog' style={showWhenLoggedIn} onClick={() => handleDelete(blog[0])}>Delete</button>
      </div>
    </div>

  )
}

export default SingleUserPage