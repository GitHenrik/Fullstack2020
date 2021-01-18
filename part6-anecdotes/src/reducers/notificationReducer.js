export const notify = (content, duration, updateTimerId) => {
  //instantiate timer id with some timeout value
  // console.log('got this data: ', content)
  // console.log('got this duration ', duration)

  //final task 6.21 for course part 6, clearing redundant notifications 
  return dispatch => {

    dispatch({
      type: 'NOTIFY',
      data: content
    })

    const newTimerId = setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        data: ''
      })
    }, duration)
    updateTimerId(newTimerId)
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
