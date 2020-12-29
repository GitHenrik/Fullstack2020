import React from 'react'

const NewBlogForm = ({handleCreation, title, author, url, setTitle, setAuthor, setUrl}) => {
    return (
        <form onSubmit={handleCreation}>
          <label>Title:</label><input value={title} onChange={({target}) => setTitle(target.value)}/><br/>
          <label>Author:</label><input value={author} onChange={({target}) => setAuthor(target.value)}/><br/>
          <label>Url:</label><input value={url} onChange={({target}) => setUrl(target.value)}/><br/>
          <button type='submit'>Create blog</button>
        </form>
    )
}

export default NewBlogForm