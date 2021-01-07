import React, { useState } from 'react'
//import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, loggedIn }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  const hideWhenVisible = { display: showAllInfo ? 'none' : '' }
  const showWhenVisible = { display: showAllInfo ? '' : 'none' }
  const showWhenLoggedIn = { display: loggedIn ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowAllInfo(!showAllInfo)
  }

  //liking a blog / task 5.8*


  return (
    <div id='entire-blog' style={blogStyle}>
      <div id='minimized-blog' className='title-author-test'>
        {blog.title}<br /> {blog.author}
        <button id='view-blog' style={hideWhenVisible} onClick={() => toggleVisibility()}>View</button>
        <button id='hide-blog' style={showWhenVisible} onClick={() => toggleVisibility()}>Hide</button>
      </div>
      <div id='maximized-blog' style={showWhenVisible} className='show-all-test'>
        {blog.url}<br />
        Likes: {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>Like</button><br />
        {blog.user.name}
        <button id='delete-blog' style={showWhenLoggedIn} onClick={() => handleDelete(blog)}>Delete</button>

      </div>
    </div>
  )
}

// PropTypes commented out for testing in tasks 5.13 ->.
// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   loggedIn: PropTypes.bool.isRequired
// }

export default Blog
