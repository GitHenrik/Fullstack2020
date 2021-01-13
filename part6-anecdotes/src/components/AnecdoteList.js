import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyVote } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  //filter usage for course task 6.12*
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  //course task 6.11, using notification
  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(notifyVote(content))
    setTimeout(() => dispatch(notifyVote('')), 5000)
  }

  const displayAnecdotes = allAnecdotes => {
    const filteredAnecdotes = filterAnecdotes(allAnecdotes)
    return (
      <div>
        {filteredAnecdotes.map(anecdote => {
          return (<div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
          )
        })}

      </div>
    )
  }

  //filters the list to display only valid anecdotes
  const filterAnecdotes = allAnecdotes => {
    if (!filter)
      return allAnecdotes
    const filteredAnecdotes = []
    allAnecdotes.map(anecdote => {
      if (anecdote.content.includes(filter)) {
        return filteredAnecdotes.push(anecdote)
      }
      return null
    })
    return filteredAnecdotes
  }

  return displayAnecdotes(anecdotes)

}

export default AnecdoteList