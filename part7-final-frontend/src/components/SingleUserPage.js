import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleUserPage = () => {
  const id = useParams().id // hook has to be called outside the filter function
  const user = useSelector(state => state.users.filter(u => u.id === id))
  if (!user[0]) {
    return null
  }
  return (
    <div>
      <h1>{user[0].name}</h1>
      <h3>List of the author's blogs</h3>
      <ul>
        {user[0].blog.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>

  )
}

export default SingleUserPage