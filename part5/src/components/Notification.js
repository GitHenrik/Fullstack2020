import React from 'react'

//used for various notifications for course task 5.4*
const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return <h1>{message}</h1>
}
    
export default Notification