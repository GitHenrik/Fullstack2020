import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//course task 6.9 / store formation in its own file
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store