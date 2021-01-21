import React from 'react'
import PropTypes from 'prop-types'
//as of task 7.10 this is still controlled through react state
const LoginForm = ({ username, password, handleSubmit, setUsername, setPassword }) => {
  return (
    <div>
      <h3>Login to the application</h3>
      <form id='login-form' onSubmit={handleSubmit}>
        <label>Username:</label><input id='username' value={username} onChange={({ target }) => setUsername(target.value)} /><br />
        <label>Password:</label><input id='password' value={password} onChange={({ target }) => setPassword(target.value)} /><br />
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm