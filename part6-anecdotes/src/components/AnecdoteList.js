import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, filter, voteAnecdote, notify }) => {

  //const anecdotes = useSelector(state => state.anecdotes)
  //filter usage for course task 6.12*
  //const filter = useSelector(state => state.filter)

  //const dispatch = useDispatch()
  //course task 6.11, using notification
  const vote = anecdote => {
    //dispatch(voteAnecdote(anecdote))
    //dispatch(notify(`You voted for ${anecdote.content}`, 3000))
    voteAnecdote(anecdote)
    notify(`You voted for ${anecdote.content}`, 3000)
    //setTimeout(() => dispatch(notify('')), 5000)
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
              <button onClick={() => vote(anecdote)}>vote</button>
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notify
}

const connectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
//export default AnecdoteList
export default connectedAnecdoteList