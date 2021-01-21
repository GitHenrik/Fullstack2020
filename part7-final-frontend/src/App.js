//FullStack 2020 -course tasks, part 7, Henrik Tarnanen. Template taken from course material as expected.
//This final part of the course uses the same code template as course parts 4-5.

//commented out code includes implementation from the mentioned course parts 4-5.

import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { createBlog, getBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { getUsers } from './reducers/allUsersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import SingleUserPage from './components/SingleUserPage'
import SingleBlogPage from './components/SingleBlogPage'

const App = () => {

  //Only form state is saved in React state instead of redux.
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  // user is visible to several components from here. It could be selected from 
  // redux state individually in each different place if that was wanted
  const user = useSelector(state => state.user)

  useEffect(() => {
    //instantiates all blogs from backend and inits user state
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
    dispatch(getUsers())
    dispatch(getBlogs())
  }, [dispatch])


  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      //after logging in, update the state accordingly
      dispatch(setUser({
        token: user.token,
        username: user.username,
        name: user.name
      }))
      dispatch(setNotification('Successful login'))
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      dispatch(setNotification('wrong credentials'))
    }
  }

  const handleLogout = () => {
    dispatch(setNotification('Logged out'))
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedUser')
  }

  // task 7.10 / blog creation in redux
  const handleCreation = async event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    // const createdBlog = await blogService.create(newBlog)
    // setBlogs(blogs.concat(createdBlog))
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`Created a new blog called ${newBlog.title}`))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  //task 7.11 / like button functionality 
  const handleLike = async blog => {
    const newLikes = blog.likes + 1
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      user: blog.user.id
    }
    dispatch(likeBlog(blog.id, updatedBlog))

    //put request to update data on the server
    //await blogService.update(blog.id, updatedBlog)
    //update frontend with new data
    //const updatedBlogs = await blogService.getAll()
    //setBlogs(updatedBlogs)
    //setBlogs(updatedBlogs.sort((blog, nextBlog) => { return nextBlog.likes - blog.likes }))
  }

  //task 7.11 / blog deletion
  const handleDelete = async blog => {
    if (window.confirm(`Remove a blog called ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
      //const updatedBlogs = blogs.filter(blogToSave => blog.id !== blogToSave.id)
      //setBlogs(updatedBlogs.sort((blog, nextBlog) => { return nextBlog.likes - blog.likes }))
    }
  }

  if (user === null) {
    return (

      <div>
        <Notification />

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
  //the element is always the menu
  return (
    <Router>
      <div style={{ padding: 2, border: "2px solid black" }}>
        <Link style={{ padding: 4 }} to='/'>Blogs</Link>
        <Link style={{ padding: 4 }} to='/users'>User list</Link>
        {user.username} has logged in
        <button onClick={handleLogout}>Logout</button>

      </div>
      <Notification />
      <div>
        <Switch>
          <Route path='/blogs/:id'>
            <SingleBlogPage handleLike={handleLike} handleDelete={handleDelete} user={user} />
          </Route>
          <Route path='/users/:id'>
            <SingleUserPage />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/'>
            <Togglable buttonLabel={'Create a new blog'}>
              <NewBlogForm

                handleCreation={handleCreation}
                title={title}
                author={author}
                url={url}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setUrl={setUrl}
              />
            </Togglable>
            <BlogForm />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App