import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { updateTimerId } from '../reducers/timerReducer'

const AnecdoteForm = ({ newAnecdote, notify, updateTimerId, timer }) => {

  //const dispatch = useDispatch()

  const create = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //dispatch(newAnecdote(content))
    //dispatch(notify(`Created a new anecdote: ${content}`, 3000))
    newAnecdote(content)
    clearTimeout(timer)
    notify(`Created a new anecdote: ${content}`, 3000, updateTimerId)
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
  notify,
  updateTimerId
}

const mapStateToProps = state => {
  return {
    timer: state.timer
  }
}

const connectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
//export default AnecdoteForm
export default connectedAnecdoteForm