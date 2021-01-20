export const setNotification = content => {

  return dispatch => {

    dispatch({
      type: 'NEW_NOTIFICATION',
      data: content
    })

    setTimeout(() => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: null
      })
    }, 3000)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      //const newState = action.data
      //return newState
      return action.data
    default:
      return state
  }
}

export default notificationReducer