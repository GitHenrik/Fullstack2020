import React from 'react'

const NewBlogForm = ({handleCreation, title, author, url, setTitle, setAuthor, setUrl, creationVisible, setCreationVisible}) => {

   
  const hideWhenVisible = { display: creationVisible ? 'none' : '' }
  const showWhenVisible = { display: creationVisible ? '' : 'none' }
  if (!creationVisible) {
    return (
        <div style={hideWhenVisible}>
          <button onClick={() => setCreationVisible(true)}>Create a new blog</button>
        </div>
    )
  }
  return (
    <div style={showWhenVisible}>
        <form onSubmit={handleCreation}>
          <label>Title:</label><input value={title} onChange={({target}) => setTitle(target.value)}/><br/>
          <label>Author:</label><input value={author} onChange={({target}) => setAuthor(target.value)}/><br/>
          <label>Url:</label><input value={url} onChange={({target}) => setUrl(target.value)}/><br/>
          <button type='submit'>Create blog</button>
        </form>
        <button onClick={() => setCreationVisible(false)}>Cancel creation</button>
        </div>
  )
}

export default NewBlogForm