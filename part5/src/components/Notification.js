import React from 'react'
import PropTypes from 'prop-types'
//used for various notifications for course task 5.4*
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div id='notification'><h1>{message}</h1></div>
}

Notification.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null])
  ])
}

export default Notification