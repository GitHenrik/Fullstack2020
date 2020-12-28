import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

//FullStack 2020 -course tasks, part 5. Template taken from course material as expected.
//uses backend implementation from course tasks in course part 4.
//it is assumed that a logged user can see blogs from all users.
const App = () => {
  const [blogs, setBlogs] = useState([])
  //state for current user
  const [user, setUser] = useState(null)
  //states for login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //instantiates all blogs from backend
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  //Login handler, course task 5.1
  //TODO: laita renderöitymään pelkästään tämän käyttäjän blogit (tarkista, että piti olla näin)
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})

      //after logging in, update the state accordingly
      setUser({
        token: user.token,
        username: user.username,
        name: user.name
      })
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      window.alert('wrong credentials')
    }
  }

  //TODO logout for task 5.2
  const handleLogout = () => {
    setUser(null)
  }

  if (user === null) {
    return (
      <LoginForm
       username={username}
       password={password}
       handleSubmit={handleSubmit}
       setUsername={setUsername}
       setPassword={setPassword}
      />
    )
  }

  return (
    <BlogForm 
      username={user.username}
      handleLogout={handleLogout}
      blogs={blogs}
      />
  )
}

export default App