import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = async event => {
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const createdAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(newAnecdote(createdAnecdote))
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

export default AnecdoteForm