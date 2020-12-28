import React from 'react'
const LoginForm = ({username, password, handleSubmit, setUsername, setPassword}) => {
    return (
      <div>
        <h3>Login to the application</h3>
        <form onSubmit={handleSubmit}>
          <label>Username:</label><input value={username} onChange={({target}) => setUsername(target.value)}/><br/>
          <label>Password:</label><input value={password} onChange={({target}) => setPassword(target.value)}/><br/>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  export default LoginForm