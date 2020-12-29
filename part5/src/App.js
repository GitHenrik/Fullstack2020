import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

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
  //states for new blog creation
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //state for notification messages
  const [message, setMessage] = useState(null)
  //state to handle custom display
  const [creationVisible, setCreationVisible] = useState(false)
  //instantiates all blogs from backend
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  //Login handler, course task 5.1
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token) 
      //after logging in, update the state accordingly
      setUser({
        token: user.token,
        username: user.username,
        name: user.name
      })
      setMessage('Successful login')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  //logout for task 5.2
  const handleLogout = () => {
    setMessage('Logged out')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    //console.log('logged out')
  }


  //blog creation for task 5.3
  const handleCreation = async event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const createdBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(createdBlog))
    setMessage(`Created a new blog called ${newBlog.title}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    setCreationVisible(false)
  }

  if (user === null) {
    return (
      <div>
      <Notification message={message}/>
      
      <LoginForm
       username={username}
       password={password}
       handleSubmit={handleSubmit}
       setUsername={setUsername}
       setPassword={setPassword}
      />
      </div>
    )
  }

  
  const hideWhenVisible = { display: creationVisible ? 'none' : '' }
  const showWhenVisible = { display: creationVisible ? '' : 'none' }
  
  return (
    <div>
      <Notification message={message}/>
      <div>
        <h4>User {user.username} has logged in</h4>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={hideWhenVisible}>
          <button onClick={() => setCreationVisible(true)}>Create a new blog</button>
        </div>
      <div style={showWhenVisible}>
        <NewBlogForm
          handleCreation={handleCreation}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
        <button onClick={() => setCreationVisible(false)}>Cancel creation</button>
      </div>
      
      <BlogForm 
        blogs={blogs}
      />
    </div>
  )
}

export default App