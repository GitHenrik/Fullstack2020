import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// FullStack2020 course, tasks 1.12*-1.14*, Henrik Tarnanen

const App = ({ anecdotes }) => {
  //first anecdote to be displayed is the first one in the array
  const [selected, setSelected] = useState(0)
  const [voteCounts, setVoteCounts] = useState([0, 0, 0, 0, 0, 0])
  const [max, setMax] = useState(0)

  //returns a random index for an anecdote to be displayed next
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  //increases vote count for the current anecdote.
  const incrementVote = current => {
    const temp = { ...voteCounts };
    temp[current] += 1;
    //if it's the most voted, display it as the most popular
    if (temp[current] > temp[max])
      setMax(current)
    setVoteCounts(temp)
  }

  return (
    <>
      <div>
        <h1>Today's anecdote</h1>
      </div>
      <div>
        <button onClick={() => incrementVote(selected)}>Vote for this anecdote</button>
        <button onClick={randomAnecdote}>Next anecdote</button>
      </div>

      <div>
        {anecdotes[selected]}
        <VoteCounter voteCount={voteCounts[selected]} />
      </div>
      <h1>Best anecdote ever</h1>
      <div>
        {anecdotes[max]}
        <VoteCounter voteCount={voteCounts[max]} />
      </div>
    </>
  )
}

const VoteCounter = ({ voteCount }) => {
  return <p>This anecdote has {voteCount} votes.</p>
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)