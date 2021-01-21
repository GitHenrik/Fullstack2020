import blogService from '../services/blogs'

export const createBlog = blog => {
  return async dispatch => {
    const response = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: response
    })
  }
}

export const likeBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const getBlogs = () => {
  //todo
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}


const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'GET_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      const newState = state.map(blog => blog.id === action.data.id ? action.data : blog)
      return newState
    case 'DELETE_BLOG':
      let reducedState = []
      state.map(blog => blog.id === action.data ? null : reducedState.push(blog))
      return reducedState
    default:
      return state
  }
}

export default blogReducer