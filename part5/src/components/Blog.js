import React, {useState} from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  const hideWhenVisible = { display: showAllInfo ? 'none' : '' }
  const showWhenVisible = { display: showAllInfo ? '' : 'none' }

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
    <div style={blogStyle}>
      {blog.title}
      <button style={hideWhenVisible} onClick={() => toggleVisibility()}>View</button>
      <button style={showWhenVisible} onClick={() => toggleVisibility()}>Hide</button>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        {blog.likes}<button onClick={() => handleLike(blog)}>Like</button><br/>
        {blog.author}<br/>
        <button onClick={() => handleDelete(blog)}>Delete</button>
      </div>
    </div> 
  )
}
  
  

export default Blog
