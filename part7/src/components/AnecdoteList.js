import React from 'react';
import { Switch, Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>

    <h2>Anecdotes</h2>
    <Switch>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
      </ul>
    </Switch>
  </div>
)

export default AnecdoteList