import React from 'react'
import ReactDOM from 'react-dom'
//import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
//import reducer from './reducers/anecdoteReducer'
import store from './reducers/store'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)