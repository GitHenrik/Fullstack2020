import React, { useState } from 'react'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import About from './components/About'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import {
  BrowserRouter as Router,
  Switch, Route, useParams
} from "react-router-dom"

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(anecdote.content)
    setTimeout(() => {
      setNotification('')
    }, 10000)

  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const Anecdote = () => {
    const id = useParams().id
    const anecdote = anecdoteById(id)
    return <h1 key={anecdote.id} >{anecdote.content}</h1>
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification content={notification} />
      <Router>
        <Menu />

        <Switch>
          <Route path="/anecdotes/:id"><Anecdote /></Route>
          <Route path="/about"><About /></Route>
          <Route path="/create"><CreateNew addNew={addNew} /></Route>
          <Route path="/"><AnecdoteList anecdotes={anecdotes} /></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App;
