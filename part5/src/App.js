import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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
  }

  //course task 5.8*, this is called when clicking a like button to increment likes by 1
  //handler is passed as a prop to single blogs through the BlogForm-component
  const handleLike = async blog => {
    //console.log('Updating blog with id ', blog.id)
    const newLikes = blog.likes + 1
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      user: blog.user.id
    }
    //put request to update data on the server
    await blogService.update(blog.id, updatedBlog)
    //update frontend with new data
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
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


  return (
    <div>
      <Notification message={message}/>
      <div>
        <h4>User {user.username} has logged in</h4>
        <button onClick={handleLogout}>Logout</button>
      </div>
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
      <BlogForm blogs={blogs} handleLike={handleLike}/>
    </div>
  )
}

export default App