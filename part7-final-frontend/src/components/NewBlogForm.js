import React from 'react'

const NewBlogForm = ({ handleCreation, title, author, url, setTitle, setAuthor, setUrl }) => {

  //as of task 7.10 this is still controlled through react state
  return (
    <div>
      <form onSubmit={handleCreation} className='newBlogForm'>
        <label>Title:</label><input value={title} onChange={({ target }) => setTitle(target.value)} id='titleInput' /><br />
        <label>Author:</label><input value={author} onChange={({ target }) => setAuthor(target.value)} className='authorInput' /><br />
        <label>Url:</label><input value={url} onChange={({ target }) => setUrl(target.value)} className='urlInput' /><br />
        <button type='submit' className='newBlogSubmit'>Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm