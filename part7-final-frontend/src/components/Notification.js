//course task 7.9, using notifications with redux
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message === null) {
    return null
  }
  return <div id='notification'><h1>{message}</h1></div>
}

export default Notification


//import PropTypes from 'prop-types'
//used for various notifications for course task 5.4*
// const Notification = ({ message }) => {
//   if (message === null) {
//     return null
//   }
//   return <div id='notification'><h1>{message}</h1></div>
// }

// Notification.propTypes = {
//   message: PropTypes.oneOfType([
//     PropTypes.string.isRequired,
//     PropTypes.oneOf([null])
//   ])
// }

// export default Notification