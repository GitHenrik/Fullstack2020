import React from 'react';
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  // destucturing to pass only the wanted props to input elements
  // renaming the reset-proprety to avoid errors from duplicates
  const { reset: resetContent, ...contentProps } = content
  const { reset: resetAuthor, ...authorProps } = author
  const { reset: resetInfo, ...infoProps } = info

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
          <input name='content' {...contentProps} />
        </div>
        <div>
          author
          <input name='author'  {...authorProps} />
        </div>
        <div>
          url for more info
          <input name='info' {...infoProps} />
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