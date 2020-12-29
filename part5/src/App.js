import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

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
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      window.alert('wrong credentials')
    }
  }

  //logout for task 5.2
  const handleLogout = () => {
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
    <div>
      <div>
        <h4>User {user.username} has logged in</h4>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <NewBlogForm
        handleCreation={handleCreation}
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
      />
      <BlogForm 
        blogs={blogs}
      />
    </div>
  )
}

export default App