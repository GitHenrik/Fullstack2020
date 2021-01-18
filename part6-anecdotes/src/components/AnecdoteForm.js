import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = ({ newAnecdote, notify }) => {

  //const dispatch = useDispatch()

  const create = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //dispatch(newAnecdote(content))
    //dispatch(notify(`Created a new anecdote: ${content}`, 3000))
    newAnecdote(content)
    notify(`Created a new anecdote: ${content}`, 3000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  newAnecdote,
  notify
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
//export default AnecdoteForm
export default connectedAnecdoteForm