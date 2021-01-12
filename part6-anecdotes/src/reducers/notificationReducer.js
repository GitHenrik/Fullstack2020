const placeholder = ''

export const notifyVote = title => {
  if (title) {
    return {
      type: 'NOTIFY',
      title: `You voted for ${title}`
    }
  }
  return {
    type: 'NOTIFY',
    title: title
  }
}

const notificationReducer = (notification = placeholder, action) => {
  switch (action.type) {
    case 'NOTIFY':
      const newNotification = action.title
      return newNotification
    default:
      return notification
  }
}

export default notificationReducer
