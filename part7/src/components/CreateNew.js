import React from 'react';
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  let history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author'  {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type="submit">create</button><button type="button" onClick={() => {
          content.reset()
          author.reset()
          info.reset()
        }}>reset</button>
      </form>
    </div >
  )

}

export default CreateNew