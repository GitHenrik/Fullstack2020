import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const newAnecdote = content => {
  return async dispatch => {
    //first complete an asynchronous operation, then dispatch the action with new data to the store
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      data: anecdote.id
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

//course task 6.5*: this is a sorting function, called for all returns in the reducer
const ordered = state => {
  return state.sort((current, next) => next.votes - current.votes)
}

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      //finds the anecdote to update, increments the vote count, then updates state
      //client side/front-end incrementation of the vote count 
      const anecToUpdate = state.find(anec => anec.id === action.data)
      const updatedAnec = { ...anecToUpdate, votes: anecToUpdate.votes + 1 }
      const newOrderedAnecdotes = ordered(state.map(anec => anec.id === action.data ? anec = updatedAnec : anec))
      //return { anecdotes: newOrderedAnecdotes, filter: state.filter }
      return newOrderedAnecdotes
    case 'NEW_ANECDOTE':
      const newAnecdotes = ordered([...state, action.data])
      //return { anecdotes: newAnecdotes, filter: state.filter }
      return newAnecdotes
    case 'INIT_ANECDOTES':
      return ordered(action.data)
    default:
      const orderedAnecdotes = ordered([...state])
      //return { anecdotes: orderedAnecdotes, filter: state.filter }
      return orderedAnecdotes
  }
}

export default anecdoteReducer