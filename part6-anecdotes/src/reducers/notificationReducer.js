export const notify = (content, duration) => {
  // console.log('got this data: ', content)
  // console.log('got this duration ', duration)
  return dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        data: ''
      })
    }, duration)
  }

}

const notificationReducer = (notification = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      const newNotification = action.data
      // console.log('doing a notification with this data: ', action.data)
      return newNotification
    default:
      return notification
  }
}

export default notificationReducer
